/** Step1. Prepare Input */
Map<String, Object> inputMap = new Map<String, Object>();

Map<String, Object> asset = new Map<String, Object>();
asset.put('Id', '02i5g000001XYZ1AAO');
asset.put('Name', 'Auto Insurance Policy');
asset.put('AnnualPremium__c', 1200.5);
asset.put('PolicyNumber__c', 'POL-2024-001');
asset.put('Status__c', 'ACTIVE');

/** Account */
Map<String, Object> account = new Map<String, Object>();
account.put('Name', 'John Doe');
asset.put('Account', account);

/** Contacts */
List<Map<String, Object>> contacts = new List<Map<String, Object>>();

Map<String, Object> contact1 = new Map<String, Object>();
contact1.put('Name', 'Amit Singh');
contact1.put('Role', 'PolicyHolder');
contacts.add(contact1);

Map<String, Object> contact2 = new Map<String, Object>();
contact2.put('Name', 'Jane Smith');
contact2.put('Role', 'Beneficiary');
contacts.add(contact2);

asset.put('Contacts', contacts);

/** Asset */
List<Map<String, Object>> assetList = new List<Map<String, Object>>();
assetList.add(asset);

inputMap.put('Asset', assetList);

/** Step2. Wrap input inside ConnectApi representation */
ConnectApi.DataMapperExecuteInputRepresentation inputRep = 
    new ConnectApi.DataMapperExecuteInputRepresentation();
    
inputRep.dataMapperInput = new List<String>{ JSON.serialize(inputMap) };
inputRep.inputType = 'JSON';

/** Step3. Add an options representation to enforce clean response formatting */
ConnectApi.DataMapperExecuteOptionsRepresentation options = 
    new ConnectApi.DataMapperExecuteOptionsRepresentation();
options.shouldSendLegacyResponse = true; // Bypasses specific standard core formatting quirks

inputRep.options = options;

/** Step4. Execute the Data Mapper using the correct API Name */
ConnectApi.DataMapperExecuteOutputRepresentation outputRep = 
    ConnectApi.OmniDesignerConnect.executeDataMapper('DMTransformAssetToPolicy', inputRep);

/** Step5. Parse response safely */
if (outputRep != null && outputRep.response != null && !outputRep.response.isEmpty()) {
    String jsonResponse = outputRep.response[0];
    System.debug('Data Mapper Output Payload: \n ' + jsonResponse);
} else {
    System.debug('Data Mapper executed but returned an empty response.');
}