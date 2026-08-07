import { LightningElement, api } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';

export default class SmartDriveQuoteSummary extends OmniscriptBaseMixin(LightningElement) {
    @api quoteData;

    get data() {
        return this.quoteData || this.omniJsonData || {};
    }

    /* ---------- JSON nodes ---------- */
    get customer() { return this.data.CustomerInformation || {}; }
    get vehicleInfo() { return this.data.VehicleInformation || {}; }
    get history() { return this.data.DrivingHistory || {}; }

    // Result comes back from the Expression Set as an array of one row
    get result() {
        const r = this.data.Result;
        if (Array.isArray(r)) return r[0] || {};
        return r || {};
    }

    /* ---------- Sidebar ---------- */
    get customerName() { return this.customer.Name || ''; }
    get customerAge() {
        const age = this.customer.Age;
        return age == null || age === '' ? '' : `Age ${age}`;
    }
    get dateOfBirth() {
        const dob = this.customer.DateOfBirth;
        if (!dob) return '';
        const d = new Date(`${dob}T00:00:00`);
        if (Number.isNaN(d.getTime())) return `DOB ${dob}`;
        return `DOB ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    get state() { return this.customer.State || ''; }

    get vehicle() {
        return this.vehicleInfo.VehicleType || '';
    }
    get vehicleAge() {
        const a = this.vehicleInfo.VehicleAge;
        if (a == null || a === '') return '';
        return `${a} ${Number(a) === 1 ? 'year' : 'years'} old`;
    }
    get vehicleUsage() {
        const u = this.vehicleInfo.Usage;
        return u ? `${u} use` : '';
    }
    get vehicleNumber() { return this.vehicleInfo.VehicleNumber || ''; }

    get coverageType() { return this.vehicleInfo.CoverageType || ''; }

    get drivingSummary() {
        const acc = this.num(this.history.NumberOfAccidents);
        const viol = this.num(this.history.TrafficViolations);
        return `${acc} ${acc === 1 ? 'accident' : 'accidents'} · ${viol} ${viol === 1 ? 'violation' : 'violations'}`;
    }
    get drivingExperience() {
        const y = this.customer.YearsOfDrivingExperience;
        if (y == null || y === '') return '';
        return `${y} ${Number(y) === 1 ? 'year' : 'years'} driving experience`;
    }
    get loyaltyYears() {
        const y = this.customer.YearsWithCompany;
        if (y == null || y === '') return '';
        return `${y} ${Number(y) === 1 ? 'year' : 'years'} with SmartDrive`;
    }

    /* ---------- Raw result values ---------- */
    get baseAmountValue() { return this.n('BaseAmount'); }
    get adjBaseValue() { return this.n('AdjBase'); }
    get subTotalValue() { return this.n('SubTotal'); }
    get afterSurchargeValue() { return this.n('AfterSurcharge'); }
    get finalPremiumValue() { return this.n('FinalPremium'); }

    /* ---------- Derived amounts ---------- */
    get riskAdjustmentValue() { return this.adjBaseValue - this.baseAmountValue; }
    get coverageChargeValue() { return this.subTotalValue - this.adjBaseValue; }
    get surchargeValue() { return this.afterSurchargeValue - this.subTotalValue; }
    get discountValue() { return this.finalPremiumValue - this.afterSurchargeValue; }

    /* ---------- Formatted amounts ---------- */
    get baseAmount() { return this.money(this.baseAmountValue); }
    get riskAmount() { return this.signed(this.riskAdjustmentValue); }
    get coverageAmount() { return this.signed(this.coverageChargeValue); }
    get surchargeAmount() { return this.signed(this.surchargeValue); }
    get discountAmount() { return this.signed(this.discountValue); }

    get adjBase() { return this.money(this.adjBaseValue); }
    get subTotal() { return this.money(this.subTotalValue); }
    get afterSurcharge() { return this.money(this.afterSurchargeValue); }
    get finalPremium() { return this.money(this.finalPremiumValue); }

    /* ---------- Percentages ----------
       The Expression Set returns some percentages scaled by 100
       (e.g. 1500 = 15%), so pct() normalises anything above 100. */
    get riskAdjPct() { return this.pct(this.result.RiskAdjPct); }
    get surchargePct() { return this.pct(this.result.SurchargePct); }
    get loyaltyDiscPct() { return this.pct(this.result.LoyaltyDiscPct); }
    get finalDiscPct() { return this.pct(this.result.FinalDiscPct); }

    get riskAdjSub() { return `Rating uplift of ${this.riskAdjPct} on the base amount`; }
    get surchargeSub() { return `${this.surchargePct} loading for accidents and violations`; }
    get discountSub() { return `${this.finalDiscPct} total, including ${this.loyaltyDiscPct} loyalty discount`; }

    /* ---------- Status ---------- */
    get quoteStatus() { return this.result.QuoteStatus || ''; }
    get isApproved() { return String(this.quoteStatus).toLowerCase() === 'approved'; }
    get statusClass() {
        return `qs-status ${this.isApproved ? 'qs-status-approved' : 'qs-status-review'}`;
    }
    get bannerClass() {
        return `qs-banner ${this.isApproved ? '' : 'qs-banner-review'}`.trim();
    }
    get bannerIcon() { return this.isApproved ? 'utility:success' : 'utility:info'; }
    get bannerTitle() {
        return this.isApproved
            ? 'Congratulations! Your quote has been approved.'
            : `Your quote status is ${this.quoteStatus || 'pending review'}.`;
    }
    get bannerSub() {
        return this.isApproved
            ? 'You are just one step away from securing your vehicle with SmartDrive Insurance.'
            : 'One of our underwriters will review the details before this quote can be issued.';
    }

    /* ---------- Helpers ---------- */
    n(key) {
        return this.num(this.result[key]);
    }
    num(v) {
        if (v == null || v === '') return 0;
        const parsed = Number(v);
        return Number.isNaN(parsed) ? 0 : parsed;
    }
    money(v) {
        return '$' + Number(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    signed(v) {
        const sign = v < 0 ? '−' : '+';
        return sign + '$' + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    pct(v) {
        let value = this.num(v);
        if (Math.abs(value) > 100) value = value / 100;
        return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + '%';
    }

    handlePrevious() {
        if (this.omniPrevStep) this.omniPrevStep();
    }
    handleSubmit() {
        if (this.omniNextStep) this.omniNextStep();
    }
    handleDownload() {
        this.dispatchEvent(new CustomEvent('downloadquote'));
    }
}
