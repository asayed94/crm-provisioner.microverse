# CRM Provisioner

## Overview

The CRM Provisioner is a powerful tool designed to streamline the management of CRM resources through code, with a primary focus on the `emarsys` provider. The current scope includes essential resources such as:
- `contact_fields`
- `external_events`
- `webhook_presets`

## Usage

1. **Installation:**
    - Execute the following command to seamlessly install the necessary package:
        ```shell
        yarn install
        ```

2. **Adding New Resources:**
    - To seamlessly incorporate new resources into the system, utilize the command:
        ```shell
        yarn add-resource <crm_provider>/<resource_type> <resource_name>
        # Example: yarn add-resource emarsys/contact_field last_active_at
        ```
        This empowers you to specify the CRM provider, resource type, and a custom name for the new resource.

3. **Deleting Resources:**
    - Removing existing resources is straightforward. Navigate to the resource's directory and delete it as needed.

4. **Modifying Resources:**
    - At present, modifying provisioned resources is not supported. Changes to resources should be carefully considered before initial provisioning.

5. **Pull Requests:**
    - Post modifications, create a pull request for thorough review and subsequent provisioning to the CRM on both environments. Remember, PR approval is a mandatory step in the process.

6. **PR Check Failures:**
    - In the event of a PR check failure, promptly reach out to @lessonnine/crm-platform for expert assistance in resolving the issue.

## Contact Us

For any additional inquiries or assistance, consult the comprehensive project documentation or connect with our team through the dedicated Slack channel `#ask-crm-platform`.


## Technical
for extra technical details please check [here](./TECHNICAL.md)