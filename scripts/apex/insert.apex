delete [SELECT Id FROM State_Surcharge_Rule__c];

List<State_Surcharge_Rule__c> rules = new List<State_Surcharge_Rule__c>{
    new State_Surcharge_Rule__c(
        State__c = 'California', Coverage_Type__c = 'Comprehensive',
        Usage__c = 'Personal', Surcharge_Percent__c = 8),
    new State_Surcharge_Rule__c(
        State__c = 'California', Coverage_Type__c = 'Comprehensive',
        Usage__c = 'Business', Surcharge_Percent__c = 12),
    new State_Surcharge_Rule__c(
        State__c = 'California', Coverage_Type__c = 'Liability',
        Usage__c = 'Personal', Surcharge_Percent__c = 4),
    new State_Surcharge_Rule__c(
        State__c = 'Texas', Coverage_Type__c = 'Comprehensive',
        Usage__c = 'Personal', Surcharge_Percent__c = 5),
    new State_Surcharge_Rule__c(
        State__c = 'Texas', Coverage_Type__c = 'Liability',
        Usage__c = 'Personal', Surcharge_Percent__c = 3),
    new State_Surcharge_Rule__c(
        State__c = 'Florida', Coverage_Type__c = 'Comprehensive',
        Usage__c = 'Personal', Surcharge_Percent__c = 15),
    new State_Surcharge_Rule__c(
        State__c = 'Florida', Coverage_Type__c = 'Liability',
        Usage__c = 'Personal', Surcharge_Percent__c = 6)
};

insert rules;
System.debug('Inserted ' + rules.size() + ' state surcharge rules.');