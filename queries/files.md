## OmniScript
### Import
sf force data tree export -q "SELECT IsMetadataCacheDisabled, IsTestProcedure, Description, OverrideKey, Name, OmniProcessKey, Language, PropertySetConfig, LastPreviewPage, OmniProcessType, ElementTypeComponentMapping, SubType, ResponseCacheType, IsOmniScriptEmbeddable, CustomJavaScript, IsIntegrationProcedure, VersionNumber, DesignerCustomizationType, Namespace, Type, RequiredPermission, WebComponentKey, IsWebCompEnabled,(SELECT Description, DesignerCustomizationType, Name, EmbeddedOmniScriptKey, IsActive, Type, ParentElementId, PropertySetConfig, SequenceNumber, Level, Id from OmniProcessElements) from OmniProcess where OmniProcessType='Omniscript' AND (Type ='team' OR Type='sample')" --target-org omnistudio-training -p -d export_directory/OmniScript -p

### Export
sf force data tree import -p ./export_directory/OmniScript/OmniProcess-OmniProcessElement-plan.json --target-org omnistudio-target-org

## IntegrationProcedure

### Import

sf force data tree export -q "SELECT IsMetadataCacheDisabled, IsTestProcedure, Description, OverrideKey, Name, OmniProcessKey, Language, PropertySetConfig, LastPreviewPage, OmniProcessType, ElementTypeComponentMapping, SubType, ResponseCacheType, IsOmniScriptEmbeddable, CustomJavaScript, IsIntegrationProcedure, VersionNumber, DesignerCustomizationType, Namespace, Type, RequiredPermission, WebComponentKey, IsWebCompEnabled,(SELECT Description, DesignerCustomizationType, Name, EmbeddedOmniScriptKey, IsActive, Type, ParentElementId, PropertySetConfig, SequenceNumber, Level, Id from OmniProcessElements) from OmniProcess where OmniProcessType='Integration Procedure' AND (Type ='team' OR Type='sample')" --target-org omnistudio-training -p -d export_directory/IntegrationProcedure -p

### Export

sf force data tree import -p ./export_directory/IntegrationProcedure/OmniProcess-OmniProcessElement-plan.json --target-org omnistudio-target-org

## DataMapper

### Import

sf force data tree export -q "Select Name, BatchSize, IsFieldLevelSecurityEnabled, IsDeletedOnSuccess, Description, IsErrorIgnored, InputParsingClass, ExpectedInputJson, InputType, ExpectedInputXml, ExpectedInputOtherData, SourceObject, IsSourceObjectDefault, IsProcessSuperBulk, OutputParsingClass, OutputType, IsNullInputsIncludedInOutput, PreprocessorClassName, SynchronousProcessThreshold, RequiredPermission, IsRollbackOnError, ResponseCacheType, PreviewJsonData, PreviewSourceObjectData, PreviewXmlData, PreviewOtherData, TargetOutputDocumentIdentifier, ExpectedOutputJson, TargetOutputFileName, ExpectedOutputXml, ExpectedOutputOtherData, Type, ResponseCacheTtlMinutes, IsAssignmentRulesUsed, XmlOutputTagsOrder, IsXmlDeclarationRemoved, GlobalKey, VersionNumber, OverrideKey, IsManagedUsingStdDesigner FROM OmniDataTransform where Name LIKE '%DME%' LIMIT 100" --target-org omnistudio-training -p -d export_directory/DataMapper -p

### Export

sf force data tree import -p ./export_directory/DataMapper/OmniDataTransform-plan.json --target-org omnistudio-target-org

## Flex Card

### Import

sf force data tree export -q "SELECT CurrencyIsoCode, ExternalId, FlexcardName, Description, VersionNumber, VersionCount, Author, IsChildCard, IsFileBased, OmniUiCardId, LastModifiedDate, LastModifiedById, IsManagedUsingStdDesigner FROM OmniFlexCardView WHERE Author != 'Salesforce'" --target-org omnistudio-training -p -d export_directory -p

### Export

sf force data tree import -p ./export_directory/OmniFlexCardView-plan.json --target-org omnistudio-target-org