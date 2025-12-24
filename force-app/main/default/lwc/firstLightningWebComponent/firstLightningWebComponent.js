import { LightningElement, api } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';

export default class FirstLightningWebComponent extends OmniscriptBaseMixin(LightningElement) {
    @api message = '';
    @api stepName;
    firstName = '';
    data= {}

    connectedCallback(){
        console.log(this.omniJsonDataStr);
        this.firstName = JSON.parse(this.omniJsonDataStr)?.Step1?.CustomLWC1?.firstName;
    }

    handleNext(){
        if(!this.handleValidate()){
            return;
        }
        this.omniApplyCallResp({
            'data' : this.data
        });
        this.omniSaveState(this.data, 'data');
        this.omniNextStep();
    }
    handlePrevious(){
        let state = this.omniGetSaveState('data');
        if(state){
            this.data = state;
        }
        this.omniPrevStep();
    }

    handleChange(evt){
        this.firstName = evt.detail.value;
        this.data.firstName = this.firstName;
        this.omniApplyCallResp({
            'data' : this.data
        });
        this.omniUpdateDataJson(this.data);
    }

    @api
    checkValidity(){
        return this.handleValidate();
    }

    handleValidate() {
        const allValid = [
            ...this.template.querySelectorAll('lightning-input'),
        ].reduce((validSoFar, inputCmp) => {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);
        return allValid;
    }
}