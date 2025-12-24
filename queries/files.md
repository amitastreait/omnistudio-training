## OmniScript
### Import
sf force data tree export -q "SELECT IsMetadataCacheDisabled, IsTestProcedure, Description, OverrideKey, Name, OmniProcessKey, Language, PropertySetConfig, LastPreviewPage, OmniProcessType, ElementTypeComponentMapping, SubType, ResponseCacheType, IsOmniScriptEmbeddable, CustomJavaScript, IsIntegrationProcedure, VersionNumber, DesignerCustomizationType, Namespace, Type, RequiredPermission, WebComponentKey, IsWebCompEnabled,(SELECT Description, DesignerCustomizationType, Name, EmbeddedOmniScriptKey, IsActive, Type, ParentElementId, PropertySetConfig, SequenceNumber, Level, Id from OmniProcessElements) from OmniProcess where OmniProcessType='Omniscript' AND (Type ='team' OR Type='sample')" --target-org omnistudio-training -p -d export_directory -p

### Export
sf force data tree import -p ./export_directory/OmniProcess-OmniProcessElement-plan.json --target-org omnistudio2

## Flex Card

### Import

sf force data tree export -q "SELECT CurrencyIsoCode, ExternalId, FlexcardName, Description, VersionNumber, VersionCount, Author, IsChildCard, IsFileBased, OmniUiCardId, LastModifiedDate, LastModifiedById, IsManagedUsingStdDesigner FROM OmniFlexCardView WHERE Author != 'Salesforce'" --target-org omnistudio-training -p -d export_directory -p

### Export

sf force data tree import -p ./export_directory/OmniFlexCardView-plan.json --target-org omnistudio2

## Integration Procedure

### Import

sf force data tree export -q "SELECT IsMetadataCacheDisabled, IsTestProcedure, Description, OverrideKey, Name, OmniProcessKey, Language, PropertySetConfig, LastPreviewPage, OmniProcessType, ElementTypeComponentMapping, SubType, ResponseCacheType, IsOmniScriptEmbeddable, CustomJavaScript, IsIntegrationProcedure, VersionNumber, DesignerCustomizationType, Namespace, Type, RequiredPermission, WebComponentKey, IsWebCompEnabled,(SELECT Description, DesignerCustomizationType, Name, EmbeddedOmniScriptKey, IsActive, Type, ParentElementId, PropertySetConfig, SequenceNumber, Level, Id from OmniProcessElements) from OmniProcess where OmniProcessType='Integration Procedure' AND (Type ='team' OR Type='sample')" --target-org omnistudio-training -p -d export_directory -p

### Export

sf force data tree import -p ./export_directory/OmniProcess-OmniProcessElement-plan.json --target-org omnistudio2