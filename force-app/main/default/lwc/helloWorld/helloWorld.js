import { LightningElement, api } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
export default class HelloWorld extends OmniscriptBaseMixin(LightningElement) {
    @api message = '';
    @api stepName;
    omniScriptDataJSON;
    data = {};

    connectedCallback(){
        let dataStr = this.omniJsonDataStr;
        console.log('data JSON ',  JSON.stringify(this.omniJsonData) )
        this.omniScriptDataJSON = JSON.parse(dataStr);
        if(this.omniJsonData?.Step1 && this.omniJsonData?.Step1?.welcomeLwc){
            this.data = this.omniJsonData?.Step1?.welcomeLwc?.data;
        }
        
    }

    handleChange(event){
        this.data.firstName = event.detail.value;
        this.omniUpdateDataJson({ 'data': this.data });
        this.omniApplyCallResp({ 'data' : this.data });
    }
    handleLastNameChange(event){
        this.data.lastName = event.detail.value;
        this.omniUpdateDataJson({ 'data': this.data });
        this.omniApplyCallResp({ 'data' : this.data });
    }

    handleClick(){
        this.omniNextStep();
    }

    handlePrevClick(){
        this.omniPrevStep();
    }
}