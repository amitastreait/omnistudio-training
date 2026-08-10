import { LightningElement } from 'lwc';
import util from "omnistudio/utility";
export default class CallDataMapper extends LightningElement {
    isLoading = false;
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
    /**
     * 
     *
     * {
        "Contact": {
            "FirstName": "Amit",
            "LastName": "Singh",
            "Email": "jacob@gmail.com"
        }
      }
     */
    handleSubmit(event) {
        event.preventDefault();
        this.isLoading = true;
        let inputParams = {
            Contact: this.contactInformation
        }
        let dmRequest = {
            type: 'DataRaptor',
            value: {
                bundleName: 'DMLCreateContact',
                inputMap: JSON.stringify(inputParams),
                optionsMap: '{}'
            }
        }

        util.getDataHandler(JSON.stringify(dmRequest))
            .then((response) => {
                console.log("DataMapper Response: \n ", response);
            })
            .catch((error) => {
                console.error("Error While Calling DataMapper: \n ", JSON.stringify(error));
            })
            .finally(() => {
                console.log('Finally Executed');
                this.isLoading = false;
            })
    }
}