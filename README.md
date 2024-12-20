


User Roles
* Administrator
* Investor
* Farm SME
* Farm Manager
* Analyst

## Common services that should be easily accessible from any screen
* Resources - These are the resources available to the user
* About - Information about Agsiri including contact information
* Chat - Chat easily with support

## Investor Flow
* Landing Page
* Portfolio - This is the complete portfolio of the logged in investor (see Portfolio Flow)
* Offerings - These are the current offerings that are available for investing. The investor can select one or more of the offerings to subscribe to

## Portfolio Flow
* Summary
* Total Investment
* Number of properties subscribed to
* Income (YTD)
* Yield (YTD)
* Total Income
* Total Yield

## List of Investments
List of all the current investments for the investor. There should also be an option for the investor to look at their previous investments. The following information can be provided for each of the investments
* Summary of the investment
* Description
* Images/Videos/Maps of the property
* Disclosures
* Property Documents
* Legal Documents (contracts etc)
* Operational Metrics
* Analytics
* Future Plan (if any)
* Option to sell shares of the property

## Offering Flow
List all the current offerings currently available to the investor. The following information can be provided for each of the offerings
*  Description of the property
* Why should the investor invest in it
* Images/Videos/Maps of the property
* Disclosures
* Property Documents
* Operational Metrics (if any) - may or may not be available for new offerings
* Analytics (if any) - may or may not be available for new offerings
* Plan for developing the property
* Option to subscribe to shares of the property

## Farm Onboarding Flow

### Types of Shares
Shares can be of different types depending on how/when they are issued.
* Preferential Shares - These are the shares that are allocated to the founding members (initial investors) of the farm. These shares have some preferential treatment. (Need to come up with what kind of preferential treatment is required - for example, voting rights)
* Ordinary Shares - Investors who invest later on will get the ordinary shares. If a founding investor sells some of his shares to another investor, the preferential shares are converted into ordinary shares

### Share Price
There are 2 ways price can be determined - Fixed price and variable price. Need to determine which is the right model for us. When a farm is onboarded, the initial share price can be set as either $500 or $1000 per share

### Number of Shares
When a farm is onboarded, the number of shares is determined based on the value of the farm and the share price
Number of shares can change based on new shares issued if the value of the farm changes due to reevaluation

### Flow
* Compute the number of shares to be issued based on the Farm value and the price of each share. Fractional shares are possible. For example, if the farm value is $350750 and the share price is $1000, we get the number of shares as 350.75
* Once the farm is onboarded, a campaign is sent out to all the customers of the system providing the complete details of the farm including the share price, number of shares etc.
* Each initial investor can opt to buy any number of shares subject to a maximum and minimum. This is to limit the number of initial investors and to prevent one investor trying to control the whole farm. This can be configured at the farm level
* There is also a minimum holding period before which the investors will not be able to sell t=== Types of Shares

## Trading Flow
This is for investors to buy and sell shares of the investment
* Shares can be sold by the investor at any time after the initial holding period.
* Shares to be sold are subject to the minimum shares that can be held by the investor, the only exception is if they want to sell all the shares
* The investor initiates the process by specifying how many shares they want sell. To make things simple, they cannot specify the ask price nor can they provide a limit. The share price will always be determined by the system
* Once the 'Sale Process' is initiated, the system generates a campaign to be sent out to all the customers with the complete details of the sale
* If one or more customers are interested in buying part or all the shares (subject to the limitation above), then the sale can proceed
* If there is oversubscription on the shares, it will be treated on a first come first serve basis.
* If there is under subscription on the shares, the seller can only sell the number of shares the buyer(s) are interested in
* If there is no interest from any of the customers, the seller will not be able to sell any of the shares
* The seller will be paying a transaction fee (say 1% of the transaction cost)
* The buyer will also pay a transaction fee (say 1% of the transaction cost)

## Publishing Flow
* Create content for campaigns, newsletters etc
* Publish campaigns, newsletters etc.
   * Campaigns can be published real time 
   * Newsletters can be published either real time or on a periodic basis

## Subscription Flow
Once an offering has been created for a farm, a campaign is sent out to all/interested investors.
* Investors subscribe to the offering providing the number of shares they are interested in investing.
* At the end of the offering period,  the shares are allocated on a first come first serve basis specifying the number shares allocated
* Legal and other documents are sent to the allocated investors
* Once all the required documents are signed by the investor, the allocated shares along with the signed legal documents become part of the investor’s portfolio.


# Agsiri Platform Design
The design focuses on the following 4 key topics
* Data Model 
* APIs
* Transition Flow
* UI Flow


## Database
Before defining the data model, we need to finalize the type of database that we are going to use for storing the platform data.
AWS DocumentDB is a good candidate for the requirements of Agsiri. The following are the features of DocumentDB that caters well to what we need here.
* Most of the data in Agsiri is semi structured and hierarchical data which lends itself very well to DocumentDB
* With a schemaless design, DocumentDB provides the flexibility required for Agsiri to evolve as necessary without making too many changes
* Support for ACID transactions - DocumentDB supports the ability to perform ACID transactions across multiple documents, statements, collections, and databases.
* Support for ML and Gen AI - Amazon DocumentDB offers capabilities to enable machine learning (ML) and generative artificial intelligence (AI) models to work with data stored in Amazon DocumentDB in real time. Customers no longer have to spend time managing separate infrastructure, writing code to connect with another service, and duplicating data from their primary database.

We will be using S3 to store images, videos and maps data. The DocumentDB will just have references to the S3 storage for the images, videos and maps.
We will also need a Document Management System (DMS) for routing and managing farm documents, legal documents and other documents. (TBD)

## Data Model
Following are the different document types and their structure

### listing
This document type (collection) stores the data from the listing (mls) database. The first step in Farm onboarding will be to integrate with listing source  and other external data sources to get the details of the farm. This information is stored in the listing DocumentDB collection

```
{
        "listing_id": "1",
      "name": "",
      "address": {
            "house_number": "",
           "street": "",
           "apartment": "",
           "city": "",
           "state": "",
           "zip": ""
     }
      "property_description": "132 acres in the heart of the Amish community",
      "property_highlights": {
            “total_acres”: 132,
            “tillable”: 105, 
            “Woodland”: 20,
            “wetland”: 2,
            “deed_restrictions”: no,
           “barns”:[
              {
                “size”: “20x30”,
               “description”: “Needs lots of repairs”
              }
            ],[a]
            "days_on_market": "",
            "type": "",
            "built_on": "",
            "renovated_on": [],
      }
      "listing_agent": {
            "name": "",
            "company": "",
            "phone_number": "",
            "email": "",
      }
      "pictures": [],
      "videos": [],
      "maps": [],
      "property_details": {
            "parking": {
                  "number_of_spaces": "",
                  "type": ""
            }
            "interior": {
                  "bathrooms": {
                        "number_full": "",
                        "number_total": "",
                        "bathroom1_level": "",
                        "bathroom2_level": "",
                   }
                   "rooms": [ {
                         "type": "",
                         "level": "",
                   } ]
                   "basement": {
                   }
                   "laundry": {
                   }
                   "fireplace": {
                   }
                   "interior_featues": {
                   }
            }
            "exterior": {
                   "features": {
                   }
                   "property_information": {
                   }
                   "lot_information": {
                   }
            }
            "financial": {
            }
            "utilities": {
                   "heating_and_cooling": {
                   }
                   "utility": {
                   }
            }
            "location": {
                   "school_information": {
                   }
                   "location_information": {
                   }
            }
            "other": {
                   "listing_information": {
                   }
            }
      }
      "sales_and_tax": {
            "sales_history": {
            }
            "tax_histort": {
            }
      }
      "public_facts": {
      }
      "schools": {
      }
}
```
	

	

### farm
Once the data is in the listing collection, we need to process the data to enhance this data with more information like soil types etc and this data gets added to the farm DocumentDB collection.
Once all the data is collected, the farm manager does a complete due_diligence process to determine if the farm is suitable to be invested in the Agsiri platform. All the findings during the due diligence process will be recorded in the farm collection.


```

{
        "farm_id": "1",
      "listing_id": "",
     "name": "217 Pickle Hill",
     "address": {
           "house_number": "",
           "street": "",
           "apartment": "",
           "city": "",
           "state": "",
           "zip": ""
     },
      "location" : {
            "longitude": "",
            "latitude": "",
      },
      "property_description" : "",
    
     "main_picture": "",
     "images": [],
     "videos": [],
     "maps: [],
      "parcel_information": [],
     "due_diligence": {
             "soil_information": {
                   "documents": [],
                   "maps": [],
             }
             "financial_information": {
                   "cash_flow": {
                   }
                   "sales_data": {
                   }
                   "expenses_data": {
                   }
                   "documents": []
             }
             "crop_information": {
             }
             "other": {
             }
     }

}

```	

	

### offering


After the due diligence process, if the farm is found suitable to be invested in, it then goes through the next step in the process - creating an offering for the farm. As part of this, we will be creating shares of the farm that the investor can invest in.


### Types of Shares
Shares can be of different types depending on how/when they are issued.
* Preferential Shares - These are the shares that are allocated to the founding members (initial investors) of the farm. These shares have some preferential treatment. (Need to come up with what kind of preferential treatment is required - for example, voting rights)
* Ordinary Shares - Investors who invest later on will get the ordinary shares. If a founding investor sells some of his shares to another investor, the preferential shares are converted into ordinary shares

### Share Price
There are 2 ways price can be determined - Fixed price and variable price. Need to determine which is the right model for us. When a farm is onboarded, the initial share price can be set as either $500 or $1000 per share

### Number of Shares
When a farm is onboarded, the number of shares is determined based on the value of the farm and the share price
Number of shares can change based on new shares issued if the value of the farm changes due to reevaluation
Offering Flow
* Compute the number of shares to be issued based on the Farm value and the price of each share. Fractional shares are possible. For example, if the farm value is $350750 and the share price is $1000, we get the number of shares as 350.75
* Once the farm is onboarded, a campaign is sent out to all the customers of the system providing the complete details of the farm including the share price, number of shares etc.
* Each initial investor can opt to buy any number of shares subject to a maximum and minimum. This is to limit the number of initial investors and to prevent one investor trying to control the whole farm. This can be configured at the farm level
* There is also a minimum holding period before which the investors will not be able to sell the shares

```
{
        "offering_id": "1",
     "farm_id": "1",
      "name": "217 Pickle Hill",
     "address": {
           "house_number": "",
           "street": "",
           "apartment": "",
           "city": "",
           "state": "",
           "zip": ""
     }
     "property_description" : "",
     "main_picture": "",
     "images": [],
     "videos": [],
     "maps: [],
      "parcel_information": [],
     "value_driver": {           // why we like the deal
      }
      "expected_returns": {
            "target_net_irr": "",
            "target_net_yield": "",
            "net_equity_multiple": "",
            "target_hold": "",
            "target_net_returns": "",
      }
      "details": {
           "valid_from_date": "",
           "valid_to_date": "",
           "total_shares": "",
           "shares_remaining": "",
           "holding_period": "",
           "minimum_holding_shares": "",
            "maximum_holding_shares": "",
            "subscription_start_date": "",
            "subscription_end_date": "",
      }
      "documents": {
            "investor_memo": "",
            "investor_documents": []
            "compliance_audits": []
      }   
}
```
	

### subscriptions
Once an offering is created, investors can subscribe to invest in the offerings. Subscriptions are always for a particular investor. Each investor will have one and only one subscription for a particular offering.

```
{
      "offering_id": "",
     "subscriptions": [ {
            "user_id": "",
            "shares_subscribed": "",
            "date_subscribed": "",
            "status": "ACTIVE|CLOSED",
       } ]
       "allocations": [ {
            "user_id": "",
            "shares_allocated": "",
            "date_allocated": "",
            "documents": []
       } ]
           
}
```	


### campaign
Once an offering is created, a campaign needs to be sent to all the/interested investors providing information about the offering, documentation, why they should invest etc. There could be multiple campaigns sent for the same offering on a periodic basis till the offering is closed or the offering has been fully subscribed to.

```
{
        "campaign_id": "1",
      "offering _id": "",
     "name": "217 Pickle Hill",
     "address": {
           "house_number": "",
           "street": "",
           "apartment": "",
           "city": "",
           "state": "",
           "zip": ""
     }
     "property_description" : "",
    
     "main_picture": "",
     "images": [],
     "videos": [],
     "maps: [],
      "expected_returns": {
            "target_net_irr": "",
            "target_net_yield": "",
            "net_equity_multiple": "",
            "target_hold": "",
            "target_net_returns": "",
      }
      "offering_details": {
           "valid_from_date": "",
           "valid_to_date": "",
           "total_shares": "",
           "shares_remaining": "",
           "holding_period": "",
           "minimum_holding_shares": "",
            "maximum_holding_shares": "",
            "subscription_start_date": "",
            "subscription_end_date": "",
      }
      "webinars": [],
      "newsletters": []     
}
```
	

	

### notifications

### user
Agsiri supports the following different types of users
* Investor
* Farm Subject Matter Expert
* Farm Manager
* Analyst
* Admin
Only investors can signup by themselves to Agsiri. All other users will be created manually.
Here is the flow when investors signup:
* Get the investor’s personal information
* Get documents for KYC/AML (driver’s license, passport…)
* Do KYC/AML checks and approve/reject investor
* Get account(s) information for funding
* Get beneficiary information

```


{
      "user_id": "",
     "first_name": "",
     "last_name": "",
     "date_of_birth": "",
     "email_address": "",
     "phone_number": "",
     "address": {
     }
      "user_role": "INVESTOR|FARM SME|FARM MANAGER|ANALYST|ADMIN",
      "investor": {
           "accounts": [ {
            } ],
           "beneficiaries": [ {
                  "first_name": "",
                  "last_name": "",
                  "relationship": "",
                  "type": "INDIVIDUAL|TRUST",
                  "percentage": "",
            } ]
      }

}
	portfolio


{
        "portfolio_id": "1",
     "user_id": "1",
      "investments": [
           {
               "offering_id": "1",
              "number_of_shares": "",
              "share_price": "",
               "investment_date": "",
              "holding_period": "",
               "documents": [],
               "status": "ACTIVE|CLOSED"
           }
      ]
    

}
```
	

	

## dataroom
Data room provides a secure way to store and organize documents and files. A very fine grained access control mechanism will be provided to exactly control who has access to what files and when they have access to those files. All access to files/documents are completely audited to provide an extensive logging and tracking mechanism to track who accessed the files and when they accessed them and for how long.
Two types of files are supported by Agsiri.
* REGULAR - These are mainly shareable  files like images, videos, maps, webinars etc. These files can be stored as they are without any encryption and extensive logging and audit tracking.
* SECURE - These files are the legal, contractual and operational documents that need to be kept extremely secure  with very fine grained access control. The files are encrypted before storing them. The keys for the encryption are managed as part using AWS Key Management Service (KMS)
Each property/farm can have its own data room. Access control can be provided at the data room level which can be overridden in the sub entities (cabinets) of the data room. Each data room can have its key for encryption to make each data room more secure.

A data room can have one or more cabinets and each cabinet can be a collection of files/documents. As a simple implementation, we can have a cabinet for each investor of the farm and all the files/documents related to the investor will be part of the cabinet. We can also have one or more non-investor cabinets for storing the regular files that are typically shared between all the investors of the farm.
The actual files are  stored within a storage system like S3 and the location URL of that is embedded within the data room. This will be flexible enough so that the storage system can be switched to a different storage system in future.

```
{
      "dataroom_id": "",
      "farm_id": "",
     "name": "",
     "description": "",
      "user_id": "",           // the owner of this data room
      "creation_date": "",
      "key_info": "",
      "permissions": [ {
            "permission_id": "",
            "type": "",
            "roles": [],         // list of roles that have this permission
            "users": [],
            "start_time": "",
            "end_time": ""
      } ]
}
```

### cabinet
Cabinet is a container for different types of files. Some files may be just static files whereas others can have a process associated with them. For example, some legal and contract files may go through a signing process. We plan to integrate with Docusign for the signing process.
Cabinets will have their own permissions on who can access the files in the cabinet, when they can access the files etc. The following permissions will be defined:
* View - This permission allows the user to just view the files without the ability to create/write/modify the files. They will not be able to copy part/whole file and they will not be able to print the file
* Read - This permission allows the user to just read the files without the ability to create/.write/modify the files. They will be able to copy part/whole files and also print the file
* Write - This permission allows the user to read, write and modify the files subject to the file status
* Create - This permission allows the user to create new files in the cabinet
Files within the cabinet can have their own permissions which usually will be much more restrictive than the permissions of the cabinet. If no permissions are specified for the files, they inherit the permissions of the cabinet. If there are multiple permissions for a user for a file/cabinet, the most restrictive (intersection)  of the different permissions are applied.

```
{
      "cabinet_id": "",
      "dataroom_id": "",
     "name": "",
     "description": "",
      "user_id": "",           // the owner of this cabinet
      "creation_date": "",
      "type": "REGULAR|SECURE",
      "permissions": [ {
            "permission_id": "",
            "type": "",
            "roles": [],         // list of roles that have this permission
            "users": [],
            "start_time": "",
            "end_time": ""
      } ]
      "files": [ {
            "file_id": "",
            "cabinet_id": "",
           "name": "",
           "description": "",
            "user_id": "",           // the owner of this file
            "creation_date": "",
            "type": "",
            "status": "",
            "permissions": [ {
                  "permission_id": "",
                  "type": "",
                  "roles": [],         // list of roles that have this permission
                  "users": [],
                  "start_time": "",
                  "end_time": ""
            } ]

      } ]

}
```
## Service APIs

### Listing Service

#### Create a new Listing
This API creates a new listing in Agsiri. The listing object is obtained by integrating with an external source like mls.
POST /listings
	

The body of this API will be the listing document defined above.
Returns the complete listing document, if successful.
Modify an existing Listing
This API modifies an existing listing. The modifications can include a subset of the attributes or the whole listing document. If new attributes are provided in the body, they will be added to the listing document. 


PUT /listings/{listing_id}
	

The body contains the attributes that need to be modified/added
This returns the complete listing document, if successful
Get all Listings
Get all the listings from the listing service
GET /listings
	

This returns an array of all the listing documents
Get a particular listing
Get a particular listing as specified by the listing_id
GET /listings/{listing_id}
	

This returns the requested listing document
Delete a listing
Delete a listing from the listing service. Note that the listing cannot be deleted if there is any farm document that is created from the listing id specified.
DELETE /listings/{listing_id}
	

Farm Service
Create a new Farm
This API creates a new farm in Agsiri. 
POST /farms
	

The body of this API will be the farm document defined above.
Returns the complete farm document, if successful.
Modify an existing Farm
This API modifies an existing farm. The modifications can include a subset of the attributes or the whole farm document. If new attributes are provided in the body, they will be added to the farm document. 


PUT /farms/{farm_id}
	

The body contains the attributes that need to be modified/added
This returns the complete farm document, if successful
Get all Farms
Get all the farms from the farm service
GET /farms
	

This returns an array of all the farm documents
Get a particular Farm
Get a particular farm as specified by the farm_id
GET /farms/{farm_id}
	

This returns the requested farm document
Delete a Farm
Delete a farm from the farm service. Note that the farm cannot be deleted if there is any offering document that is created from the farm id specified.
DELETE /farms/{farm_id}
	

Create/Update due diligence soil information
When a farm document is initially created, it will not have any of the due diligence information. As and when the due diligence is done by different people, they will start updating the due diligence attributes.
This API creates/updates the soil information in the due diligence section. Existing attributes will be updated and new attributes will be added.
PUT /farms/{farm_id}/dd/soil
	

The body will have one or more attributes of the soil information that will be updated as part of the due diligence of the farm.
This API returns the complete farm object.
Create/Update due diligence financial information
When a farm document is initially created, it will not have any of the due diligence information. As and when the due diligence is done by different people, they will start updating the due diligence attributes.
This API creates/updates the financial information in the due diligence section. Existing attributes will be updated and new attributes will be added.
PUT /farms/{farm_id}/dd/financial
	

The body will have one or more attributes of the financial information that will be updated as part of the due diligence of the farm.
This API returns the complete farm object.
Create/Update due diligence crop information
When a farm document is initially created, it will not have any of the due diligence information. As and when the due diligence is done by different people, they will start updating the due diligence attributes.
This API creates/updates the crop information in the due diligence section. Existing attributes will be updated and new attributes will be added.
PUT /farms/{farm_id}/dd/crop
	

The body will have one or more attributes of the crop information that will be updated as part of the due diligence of the farm.
This API returns the complete farm object.
Create/Update due diligence other information
When a farm document is initially created, it will not have any of the due diligence information. As and when the due diligence is done by different people, they will start updating the due diligence attributes.
This API creates/updates the other information in the due diligence section. Existing attributes will be updated and new attributes will be added.
PUT /farms/{farm_id}/dd/other
	

The body will have one or more attributes of the other information that will be updated as part of the due diligence of the farm.
This API returns the complete farm object.
Offering Service
Create a new Offering
This API creates a new offering in Agsiri. 
POST /offerings
	

The body of this API will be the offering document defined above. Note that many attributes may not be populated when the offering is initially created
Returns the complete offering document, if successful.
Modify an existing Offering
This API modifies an existing offering. The modifications can include a subset of the attributes or the whole offering document. If new attributes are provided in the body, they will be added to the farm document. 


PUT /offerings/{offering_id}
	

The body contains the attributes that need to be modified/added
This returns the complete offering document, if successful
Get all Offerings
Get all the offerings from the offering service
GET /offerings
	

This returns an array of all the offering documents
Get a particular Offering
Get a particular offering as specified by the offering_id
GET /offerings/{offering_id}
	

This returns the requested offering document
Delete an Offering
This API is not supported as once an offering is created, it cannot be deleted.
Create/Update Expected Returns
When an offering document is initially created, it may not have all the information required. Many of these attributes may be modified/added later on by different people.
This API creates/updates the expected returns information. Existing attributes will be updated and new attributes will be added.
PUT /offerings/{offering_id}/dd/expected_returns
	

The body will have one or more attributes of the expected returns information that will be updated for the offering.
This API returns the complete offering object.
Create/Update offering details information
When an offering document is initially created, it may not have all the information required. Many of these attributes may be modified/added later on by different people.
This API creates/updates the offering details  information. Existing attributes will be updated and new attributes will be added.
PUT /offerings/{offering_id}/details
	

The body will have one or more attributes of the detail information that will be updated for the offering.
This API returns the complete offering object.
Create/Update offering documents
When an offering document is initially created, it may not have all the information required. Many of these attributes may be modified/added later on by different people.
This API creates/updates the offering details  information. Existing attributes will be updated and new attributes will be added.
PUT /offerings/{offering_id}/documents
	

The body will have one or more document information that will be updated for the offering.
This API returns the complete offering object.
Subscription Service
Create/Update subscriptions
This API creates/updates the subscriptions for an investor for an offering. Existing attributes will be updated and new attributes will be added.
PUT /subscriptions/{offering_id}/investor/{investor_id}
	

The body will have one or more attributes of the subscription information that will be updated for the offering.
This API returns the complete subscription object.
List offering subscriptions
This API lists all the subscriptions for an offering.


GET /subscriptions/{offering_id}/
	This returns an array of the subscription objects.
List investor subscriptions
This API lists all the subscriptions for an investor. This lists only the currently active subscriptions for the investor.
GET /subscriptions/investor/{user_id}/
	

This returns an array of the subscription objects.
Delete subscription
This API deletes an offering subscription for an investor. 
DELETE /subscriptions/{offering_id}/investor/{user_id}/
	

Create/Update allocations
Once the subscription period expires, allocations are done to the investors on a first come first serve basis.
This API creates/updates the allocations for an investor for an offering. Existing attributes will be updated and new attributes will be added.
PUT /subscriptions/{offering_id}/investor/{user_id}/allocations
	

The body will have one or more attributes of the allocation information that will be updated for the offering.
This API returns the complete subscription object.
Delete an allocation
This API deletes an offering allocation for an investor. 
DELETE /subscriptions/{offering_id}/investor/{user_id}/allocations
	

User Service
Create a new User
This API creates a new user in Agsiri. 
POST /users
	

The body of this API will be the user document defined above. This will also have the type of user to be created.
Returns the complete user document, if successful.
Modify a User
This API modifies an existing user
PUT /users/{user_id}
	

The body of this API will have the changes to be made to the user. 
Returns the complete user document, if successful.
Delete a User
This API deletes an existing user
DELETE /users/{user_id}
	

Returns the complete user document, if successful.
Update KYC data
Add/Update KYC data for an existing user
PUT /users/{user_id}/investor/kyc
	

The body contains KYC data including documentation (license, passport etc.) required for KYC verification
Returns the complete user document, if successful.
Update Beneficiaries
Add/Update beneficiary data for an existing user
PUT /users/{user_id}/investor/beneficiaries
	

The body contains beneficiary data to the added/updated
Returns the complete user document, if successful.
Update Accounts
Add/Update account data for an existing user
PUT /users/{user_id}/investor/accounts
	

The body contains account data to the added/updated
Returns the complete user document, if successful.
Portfolio Service
Create/Update portfolios
This API creates/updates the portfolios for an investor for an offering. Existing attributes will be updated and new attributes will be added.
PUT /portfolios/{investor_id}/offering/{offering_id}
	

The body will have one or more attributes of the portfolio information that will be updated for the investor.
This API returns the complete portfolio object.
Get active portfolios for a particular user
This API gets all the currently active portfolios for a particular investor
GET /portfolios/{investor_id}/
	

This API returns the portfolio object with the currently active portfolios.
Get all portfolios for a particular user
This API gets all portfolios, both active and closed, for a particular investor
GET /portfolios/{investor_id}/all
	

This API returns the complete portfolio object.
Data Room Service
Get a particular Data Room
This API gets a particular data room
GET /datarooms/{dataroom_id}
	

This API returns the data room object.
Get list of Data Rooms
This API gets the list of all the data rooms
GET /datarooms/
	

This API returns the list of data rooms
Create a new Data Room
This API creates a new data room..  
POST /datarooms/
	

The body will have one or more attributes of the data room that will be createdDelete a document
Update a Data Room
This API updates an existing data room..  
PUT /datarooms/{dataroom_id}
	

The body will have one or more attributes of the data room that need to be modified. Existing attributes will be updated and new attributes will be added.
Delete a Data Room
This API deletes a data room
DELETE /datarooms/{dataroom_id}
	

This returns the data room that was deleted.
Get a particular Data Room Permission
This API gets a particular data room permission
GET /datarooms/{dataroom_id}/permissions/{permission_id}
	

This API returns the data room permission object.
Get list of Data Room Permnissions
This API gets the list of all permissions for a data room
GET /datarooms/{dataroom_id}/permissions
	

This API returns the list of data room permissions
Create a new Data Room Permission
This API creates a new data room permission
POST /datarooms/{dataroom_id}/permissions
	

The body will have one or more attributes of the data room permission that will be created
Update a Data Room Permission
This API updates an existing data room permission
PUT /datarooms/{dataroom_id}/permissions/{permission_id}
	

The body will have one or more attributes of the data room permission that need to be modified. Existing attributes will be updated and new attributes will be added.
Delete a Data Room Permission
This API deletes a data room permission
DELETE /datarooms/{dataroom_id}/permissions/{permission_id}
	

This returns the data room permission that was deleted.
Check if user has permissions for the Data Room
This API checks if the given user has the required permissions to access the data room. The body contains the permissions that are needed for the access.
POST /datarooms/{dataroom_id}/user/{user_id}/checkpermission
	

This returns if the user has the needed permissions to access the data room.
Get a particular Cabinet
This API gets a particular cabinet
GET /cabinets/{cabinet_id}
	

This API returns the cabinet object.
Get list of Cabinets
This API gets the list of all the cabinets
GET /cabinets/
	

This API returns the list of cabinets
Create a new Cabinet
This API creates a new cabinet 
POST /cabinets/
	

The body will have one or more attributes of the cabinet that will be created
Update a Cabinet
This API updates an existing cabinet
PUT /cabinets/{cabinets_id}
	

The body will have one or more attributes of thecabinet that need to be modified. Existing attributes will be updated and new attributes will be added.
Delete a Cabinet
This API deletes a cabinet
DELETE /cabinets/{cabinet_id}
	

This returns the cabinet that was deleted.
Get a particular Cabinet Permission
This API gets a particular cabinet permission
GET /cabinets/{cabinet_id}/permissions/{permission_id}
	

This API returns the cabinet permission object.
Get list of Cabinet Permissions
This API gets the list of all permissions for a cabinet
GET /cabinets/{cabinet_id}/permissions
	

This API returns the list of cabinet permissions
Create a new Cabinet Permission
This API creates a new cabinet permission
POST /cabinets/{cabinets_id}/permissions
	

The body will have one or more attributes of the cabinet permission that will be created
Update a Cabinet Permission
This API updates an existing cabinet permission
PUT /cabinets/{cabinet_id}/permissions/{permission_id}
	

The body will have one or more attributes of the cabinet permission that need to be modified. Existing attributes will be updated and new attributes will be added.
Delete a Cabinet Permission
This API deletes a cabinet permission
DELETE /cabinets/{cabinet_id}/permissions/{permission_id}
	

This returns the cabinet permission that was deleted.
Check if user has permissions for the cabinet
This API checks if the given user has the required permissions to access the cabinet. The body contains the permissions that are needed for the access.
POST /cabinets/{cabinet_id}/user/{user_id}/checkpermission
	

This returns if the user has the needed permissions to access the cabinet.
Get a particular File
This API gets a particular file in a cabinet
GET /cabinets/{cabinet_id}/files/{file_id}
	

This API returns the file object.
Get list of Files
This API gets the list of all the files in the cabinet
GET /cabinets/{cabinet_id}/files
	

This API returns the list of files in the cabinet
Create a new File
This API creates a new file in the cabinet
POST /cabinets/{cabinet_id}/files
	

The body will have one or more attributes of the file that will be created
Update a File
This API updates an existing file in a cabinet
PUT /cabinets/{cabinets_id}/files/{file_id}
	

The body will have one or more attributes of the file that need to be modified. Existing attributes will be updated and new attributes will be added.
Delete a File
This API deletes a file in the cabinet
DELETE /cabinets/{cabinet_id}/files/{file_id}
	

This returns the file that was deleted.
Get a particular File Permission
This API gets the particular permission of a file in a cabinet
GET /cabinets/{cabinet_id}/files/{file_id}permissions/{permission_id}
	

This API returns the file permission object.
Get list of File Permissions
This API gets the list of all permissions for a file in a cabinet
GET /cabinets/{cabinet_id}/files/{file_id}/permissions
	

This API returns the list of permissions for a file in the cabinet
Create a new File Permission
This API creates a new permission for a file in the cabinet
POST /cabinets/{cabinets_id}/files/{file_id}/permissions
	

The body will have one or more attributes of the file permission that will be created
Update a File Permission
This API updates an existing file permission in a cabinet
PUT /cabinets/{cabinet_id}/files/{file_id}/permissions/{permission_id}
	

The body will have one or more attributes of the file permission that need to be modified. Existing attributes will be updated and new attributes will be added.
Delete a File Permission
This API deletes a file permission
DELETE /cabinets/{cabinet_id}/files/{file_id}/permissions/{permission_id}
	

This returns the file permission that was deleted.
Check if user has permissions for the file
This API checks if the given user has the required permissions to access the file in the cabinet.. The body contains the permissions that are needed for the access.
POST /cabinets/{cabinet_id}/files/{file_id}/user/{user_id}/checkpermission
	

This returns if the user has the needed permissions to access the file in the cabinet.






































[a]@jchangav@gmail.com added these to capture the information related to outbuildings like barns, storage, sheds, workshops, garages etc.
