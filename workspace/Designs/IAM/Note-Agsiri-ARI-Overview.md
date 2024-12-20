# Agsiri IAM ARIs

Agsiri IAM (Identity and Access Management) ARIs (Agsiri Resource Identifiers) are unique identifiers used to specify resources in the Agsiri ecosystem. ARIs follow a standardized format, enabling clear and consistent identification of Agsiri resources across different services and regions. Here's a detailed description of the structure and use of IAM ARIs:

## Structure of an ARI

An ARI consists of several components, each providing specific information about the resource it identifies. The general format of an ARI is as follows:

```
ari:agsiri:service:region:account-id:resource
```

- **ari**: The literal prefix "ari" indicating that the string is an ARI.
- **agsiri**: The fixed namespace indicating that this is an Agsiri resource.
- **service**: The Agsiri service namespace (e.g., `iam`, `dataroom`, `workflow`, `farmops`, `marketplace`).
- **region**: The 2-letter country code where the resource resides (e.g., `us` for the United States, `ca` for Canada).
- **account-id**: The Agsiri account ID of the owner (a unique identifier).
- **resource**: The specific resource identifier, which can include resource type and resource name or ID.

## Example ARIs

Here are some examples of ARIs for different IAM resources:

1. **User ARI**:
    ```
    ari:agsiri:iam:us:123456789012:user/JohnDoe
    ```
    - Identifies an IAM user named "JohnDoe" in the Agsiri account with ID `123456789012` located in the United States.

2. **Role ARI**:
    ```
    ari:agsiri:iam:us:123456789012:role/AdminRole
    ```
    - Identifies an IAM role named "AdminRole" in the Agsiri account with ID `123456789012` located in the United States.

3. **Policy ARI**:
    ```
    ari:agsiri:iam:us:123456789012:policy/ReadOnlyAccess
    ```
    - Identifies a managed policy named "ReadOnlyAccess" in the Agsiri account with ID `123456789012` located in the United States.

4. **Group ARI**:
    ```
    ari:agsiri:iam:us:123456789012:group/Developers
    ```
    - Identifies an IAM group named "Developers" in the Agsiri account with ID `123456789012` located in the United States.

## Usage of ARIs

- **Permissions and Policies**: ARIs are used in IAM policies to define which resources an identity (user, group, role) can access. For example, you can specify ARIs in the `Resource` element of an IAM policy to restrict access to specific resources.
  
- **Cross-Account Access**: ARIs are crucial for granting cross-account access. You can reference ARIs from different accounts to allow or deny access to resources across Agsiri accounts.
  
- **Logging and Monitoring**: ARIs appear in Agsiri activity logs and events, helping you to track and monitor access to your resources.

### Example Policy Using ARIs

Here’s an example of an IAM policy that uses ARIs to allow a user to access a data room and a workflow resource:

```json
{
    "Version": "2024-07-24",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "dataroom:*",
            "Resource": "ari:agsiri:dataroom:us:123456789012:dataroom/my-dataroom"
        },
        {
            "Effect": "Allow",
            "Action": "workflow:*",
            "Resource": "ari:agsiri:workflow:us:123456789012:process/my-process"
        }
    ]
}
```

- The policy grants full access (`"dataroom:*"`) to the data room identified by the ARI `"ari:agsiri:dataroom:us:123456789012:dataroom/my-dataroom"`.
- It also grants full access (`"workflow:*"`) to the workflow process identified by the ARI `"ari:agsiri:workflow:us:123456789012:process/my-process"`.

## Summary

ARIs are a foundational aspect of Agsiri IAM, enabling precise identification and control over Agsiri resources. Their consistent format and widespread usage across Agsiri services make them indispensable for resource management, security, and automation in the Agsiri ecosystem.
