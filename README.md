# OmniStudio Training

A Salesforce DX project used as a hands-on training and reference workspace for **OmniStudio** and the **Business Rules Engine (BRE)**. It contains a working set of OmniScripts, Integration Procedures, Data Mappers, FlexCards, Expression Sets, Decision Matrices, and the Lightning Web Components that call into them.

The running example throughout the repo is **SmartDrive**, a motor-insurance quoting flow: collect customer / vehicle / driving-history details in an OmniScript, run them through a rules engine, and render the resulting premium in a custom LWC.

All metadata in this project is file-based and is deployed with the **Salesforce CLI (`sf`)**.

---

## What's in here

### OmniStudio metadata (`force-app/main/default/`)

| Folder | Contents |
| --- | --- |
| [omniScripts/](force-app/main/default/omniScripts/) | 6 OmniScripts — `Vehicle_Insurance`, `Vehicle_Premium`, `quote_motor`, `view_WeatherInformation` (v1–v3) |
| [omniIntegrationProcedures/](force-app/main/default/omniIntegrationProcedures/) | 35 Integration Procedures covering account/case CRUD, HTTP callouts, loop blocks, try/catch, remote actions, long-running tests |
| [omniDataTransforms/](force-app/main/default/omniDataTransforms/) | 4 Data Mappers (`DMEAccountExtract`, `DMEAccountWithOpportunities`, `DMEContactRecords`, …) |
| [omniUiCard/](force-app/main/default/omniUiCard/) | 10 FlexCards, including parent/child card examples and account classification cards |

### Business Rules Engine

| Folder | Contents |
| --- | --- |
| [expressionSetDefinition/](force-app/main/default/expressionSetDefinition/) | `SmartDrive_Premium_Engine` — the orchestrating expression set |
| [decisionMatrixDefinition/](force-app/main/default/decisionMatrixDefinition/) | Base premium, risk level, experience discount, membership/roadside fee matrices |
| [decisionTables/](force-app/main/default/decisionTables/) | `Insurance_Underwriting_Rule`, `SmartDrive_State_Surcharge` |
| [objects/](force-app/main/default/objects/) | Backing custom objects: `Coverage_Plan__c`, `Insurance_Underwriting_Rule__c`, `State_Surcharge_Rule__c` (plus tabs and layouts) |

`scripts/mapping.json` documents how OmniScript JSON nodes map onto the decision-table input fields (e.g. `VehicleType => %VehicleInformation:VehicleType%`).

### Lightning Web Components (`force-app/main/default/lwc/`)

| Component | Demonstrates |
| --- | --- |
| [smartDriveQuoteSummary](force-app/main/default/lwc/smartDriveQuoteSummary/) | Custom OmniScript step UI reading `omniJsonData` and rendering the expression-set result |
| [callIntegrationProcedure](force-app/main/default/lwc/callIntegrationProcedure/) | Invoking an IP from LWC via `omniRemoteCall` and `OmniscriptBaseMixin` |
| [callDataMapper](force-app/main/default/lwc/callDataMapper/) / [callDataMapperFromLWC](force-app/main/default/lwc/callDataMapperFromLWC/) | Calling a Data Mapper from LWC using `omnistudio/utility` |
| [accountLookupLWC](force-app/main/default/lwc/accountLookupLWC/) | Overriding the standard `omniscriptLookup` and firing a pubsub event on selection |
| [pubsubComponent](force-app/main/default/lwc/pubsubComponent/) | Subscribing to `omniscript_action` / `omniscript_step` events |
| [helloWorld](force-app/main/default/lwc/helloWorld/), [firstLightningWebComponent](force-app/main/default/lwc/firstLightningWebComponent/), [productListComponent](force-app/main/default/lwc/productListComponent/), [testComponent](force-app/main/default/lwc/testComponent/), [omniscriptLWC](force-app/main/default/lwc/omniscriptLWC/) | LWC fundamentals |

### Apex

[DataMapperHelper.cls](force-app/main/default/classes/DataMapperHelper.cls) implements `System.Callable` so Data Mappers can invoke custom Apex formulas (e.g. an `upperCase` action).

### Anonymous Apex & SOQL snippets (`scripts/`)

- [scripts/apex/execute_dataMapper.apex](scripts/apex/execute_dataMapper.apex), [execute_data_mapper1.apex](scripts/apex/execute_data_mapper1.apex) — run a Data Mapper through `ConnectApi.DataMapperExecute*`
- [scripts/apex/execute_ip.apex](scripts/apex/execute_ip.apex) — run an Integration Procedure via `omnistudio.IntegrationProcedureService`
- [scripts/apex/quote_calculate.apex](scripts/apex/quote_calculate.apex) — build a full SmartDrive quote payload and invoke the premium engine
- [scripts/apex/insert.apex](scripts/apex/insert.apex) — seed `State_Surcharge_Rule__c` rows for the decision table
- [scripts/soql/account.soql](scripts/soql/account.soql) — sample SOQL
- [scripts/soql/coverage_plan.soql](scripts/soql/coverage_plan.soql), [insurance_underwriting_rule.soql](scripts/soql/insurance_underwriting_rule.soql), [state_surcharge_rule.soql](scripts/soql/state_surcharge_rule.soql) — queries for the BRE source objects (all-fields, decision-table lookup patterns, and aggregates)

---

## Prerequisites

- [Salesforce CLI](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) (`sf`)
- Node.js 18+ and npm
- An org with the **OmniStudio** managed package installed (the project declares the `omnistudio` namespace as a plugin dependency in [sfdx-project.json](sfdx-project.json))

## Getting started

```bash
npm install

# Authorize your org
sf org login web --alias omnistudio-training --set-default
```

Useful npm scripts:

```bash
npm run lint              # ESLint over aura/lwc
npm run test:unit         # sfdx-lwc-jest
npm run prettier          # format apex, lwc, xml, yaml, md
```

Husky + lint-staged run Prettier, ESLint, and related Jest tests on every commit.

---

## Deployment (Salesforce CLI)

Everything — Apex, LWC, custom objects, OmniScripts, Integration Procedures, Data Mappers, FlexCards, Expression Sets and Decision Matrices — deploys through `sf project deploy`. No DataPack or data-loading tooling is required.

### Deploy the whole project

```bash
sf project deploy start --source-dir force-app --target-org omnistudio-training
```

### Validate without committing the deployment

```bash
sf project deploy validate \
  --source-dir force-app \
  --target-org omnistudio-training \
  --test-level RunLocalTests \
  --wait 60
```

### Deploy from the manifest

[manifest/package.xml](manifest/package.xml) lists the full component set — useful for deploying an explicit, reviewable list rather than the whole directory.

```bash
sf project deploy start --manifest manifest/package.xml --target-org omnistudio-training
```

### Deploy a subset

```bash
# A single folder
sf project deploy start --source-dir force-app/main/default/omniIntegrationProcedures

# Specific components by metadata type
sf project deploy start --metadata OmniScript:Vehicle_Insurance_English_1
sf project deploy start --metadata ExpressionSetDefinition:SmartDrive_Premium_Engine
```

### Retrieve changes made in the org

```bash
sf project retrieve start --source-dir force-app --target-org omnistudio-training
sf project retrieve start --manifest manifest/package.xml --target-org omnistudio-training
```

### Regenerate the manifest after adding components

```bash
sf project generate manifest --source-dir force-app --name package --output-dir manifest
```

### Run the Apex snippets

```bash
sf apex run --file scripts/apex/quote_calculate.apex --target-org omnistudio-training
sf data query --file scripts/soql/account.soql --target-org omnistudio-training
```

> OmniStudio components deploy as inactive versions. Activate OmniScripts, Integration Procedures and FlexCards in the OmniStudio designer after deploying, and refresh the Expression Set / Decision Matrix versions in the target org.

---

## CI/CD

[.github/workflows/deploy-to-salesforce.yml](.github/workflows/deploy-to-salesforce.yml) runs the same CLI commands on changes under `force-app/**`:

- **Pull request → `main`**: `sf project deploy validate` (check-only) against the `sandbox` environment.
- **Push to `main` / manual dispatch**: `sf project deploy start`. `workflow_dispatch` exposes inputs for target org (`sandbox` | `production`), Apex test level, and a validate-only toggle.

Both jobs authenticate with an `SFDX_AUTH_URL` secret defined per GitHub Environment, and log out in an `always()` step. Deploys are serialized per branch via a `concurrency` group that never cancels in-flight runs.

To set up the secret:

```bash
sf org display --target-org <alias> --verbose   # copy the "Sfdx Auth Url" value
```

Then add it as `SFDX_AUTH_URL` under **Settings → Environments → sandbox / production**.

---

## Project layout

```
force-app/main/default/    Salesforce metadata (LWC, Apex, OmniStudio, BRE, objects)
manifest/package.xml       Full component manifest
scripts/                   Anonymous Apex, SOQL, and field-mapping notes
config/                    Scratch org definition
.github/workflows/         Deployment pipeline
```

## Reference

- [OmniStudio Documentation](https://help.salesforce.com/s/articleView?id=sf.os_omnistudio.htm)
- [Business Rules Engine](https://help.salesforce.com/s/articleView?id=sf.bre_business_rules_engine.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
