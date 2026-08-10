import { LightningElement } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
export default class CallIntegrationProcedure extends OmniscriptBaseMixin(LightningElement) {
    isLoading = false;

    handleInvokeIP() {
        this.isLoading = true;
        const params = {
            input: JSON.stringify({ recordId: "001aj000017N145AAC" }),
            sClassName: 'omnistudio.IntegrationProcedureService',
            sMethodName: 'team_GetAccountDetails',
            options: JSON.stringify({})
        }

        this.omniRemoteCall(params, true)
            .then((response) => {
                console.log('IP Success Response: \n ', JSON.stringify(response));
            })
            .catch((error) => {
                console.error('IP Error: \n ', JSON.stringify(error));
            })
            .finally(() => {
                this.isLoading = false;
            })
    }
}