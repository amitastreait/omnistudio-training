import { LightningElement } from 'lwc';
import util from "omnistudio/utility";
export default class CallDataMapper extends LightningElement {
    contactInformation = {
        FirstName: '',
        LastName: '',
        Email: ''
    };
    handleChange(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.contactInformation[fieldName] = fieldValue;
    }
    handleSubmit(event) {
        event.preventDefault();
    }
}