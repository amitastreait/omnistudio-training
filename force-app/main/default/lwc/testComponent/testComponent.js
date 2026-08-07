import {
    LightningElement,
    api,
    track
} from 'lwc';
import {
    OmniscriptBaseMixin
} from 'omnistudio/omniscriptBaseMixin';
export default class HelloOmnistudio extends LightningElement {
    @api message;
    @api stepName;
    @api value = false;
    @api omniUpdateDataJson;
    @api toggleValue;
    connectedCallback() {
        console.log('Message from OmniScript: ' + this.omniJsonDataStr);
    }
    handleNext() { }
    handleToggleChange(event) {
        this.value = event.target.checked;
        console.log('Entered value is ' + this.value);
        this.toggleValue = this.value;
        console.log('Entered value is ' + this.toggleValue);
    }
}