import { LightningElement } from 'lwc';
import pubsub from 'Omnistudio/pubsub';
import { OmniscriptBaseMixin } from 'Omnistudio/omniscriptBaseMixin';
import OmniscriptLookup from 'Omnistudio/omniscriptLookup';

export default class AccountLookupLWC extends OmniscriptBaseMixin(OmniscriptLookup) {
    selectOption(event) {
        let attr = event.target.getAttribute('data-option-index');
        const inputIndex = parseInt(attr, 10);
        this.setSelected(inputIndex).then(()=> {
            pubsub.fire("newAccountSelected", 'data', {"AccountId": this.lookupValue});
        });
        this.hideOptions();
    }
}