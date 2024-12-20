// src/ari.ts

/**
 * Interface representing the structure of an Agsiri Resource Identifier (ARI).
 */
export interface ARI {
    /** The literal prefix "ari" indicating that the string is an ARI. */
    prefix: string;
    
    /** The fixed namespace indicating that this is an Agsiri resource. */
    namespace: string;
    
    /** The Agsiri service namespace (e.g., `iam`, `dataroom`, `workflow`, `farmops`, `marketplace`). */
    service: string;
    
    /** The 2-letter country code where the resource resides (e.g., `us` for the United States, `ca` for Canada). */
    region: string;
    
    /** The Agsiri account ID of the owner (a unique identifier). */
    accountId: string;
    
    /** The specific resource identifier, which can include resource type and resource name or ID. */
    resource: string;
}

/**
 * Interface for Agsiri ARI operations.
 */
export interface IAgsiri {
    setPrefix(prefix: string): void;
    getPrefix(): string;
    setNamespace(namespace: string): void;
    getNamespace(): string;
    setService(service: string): void;
    getService(): string;
    setRegion(region: string): void;
    getRegion(): string;
    setAccountId(accountId: string): void;
    getAccountId(): string;
    setResource(resource: string): void;
    getResource(): string;
    toString(): string;
    toJSON(): ARI;
}

/**
 * Class representing an Agsiri ARI and providing methods to manipulate it.
 */
export class AgsiriAri implements IAgsiri {
    private ari: ARI;

    /**
     * Constructor to create an AgsiriAri instance.
     * Can be instantiated with a string, an ARI object, or without parameters.
     * 
     * @param {string | ARI} ari - The ARI string or ARI object.
     */
    constructor(ari?: string | ARI) {
        if (typeof ari === 'string') {
            this.ari = AgsiriAri.fromString(ari).toJSON();
        } else if (ari) {
            this.validateARI(ari);
            this.ari = ari;
        } else {
            this.ari = {
                prefix: 'ari',
                namespace: 'agsiri',
                service: '',
                region: '',
                accountId: '',
                resource: ''
            };
        }
    }

    /**
     * Validate the ARI structure.
     * 
     * @param {ARI} ari - The ARI object to validate.
     */
    private validateARI(ari: ARI): void {
        if (ari.prefix !== 'ari') {
            throw new Error('Invalid ARI prefix');
        }
        if (ari.namespace !== 'agsiri') {
            throw new Error('Invalid ARI namespace');
        }
        // Add further validations as needed
    }

    /**
     * Set the prefix of the ARI.
     * 
     * @param {string} prefix - The prefix to set.
     */
    public setPrefix(prefix: string): void {
        this.ari.prefix = prefix;
    }

    /**
     * Get the prefix of the ARI.
     * 
     * @returns {string} The prefix of the ARI.
     */
    public getPrefix(): string {
        return this.ari.prefix;
    }

    /**
     * Set the namespace of the ARI.
     * 
     * @param {string} namespace - The namespace to set.
     */
    public setNamespace(namespace: string): void {
        this.ari.namespace = namespace;
    }

    /**
     * Get the namespace of the ARI.
     * 
     * @returns {string} The namespace of the ARI.
     */
    public getNamespace(): string {
        return this.ari.namespace;
    }

    /**
     * Set the service of the ARI.
     * 
     * @param {string} service - The service to set.
     */
    public setService(service: string): void {
        this.ari.service = service;
    }

    /**
     * Get the service of the ARI.
     * 
     * @returns {string} The service of the ARI.
     */
    public getService(): string {
        return this.ari.service;
    }

    /**
     * Set the region of the ARI.
     * 
     * @param {string} region - The region to set.
     */
    public setRegion(region: string): void {
        this.ari.region = region;
    }

    /**
     * Get the region of the ARI.
     * 
     * @returns {string} The region of the ARI.
     */
    public getRegion(): string {
        return this.ari.region;
    }

    /**
     * Set the account ID of the ARI.
     * 
     * @param {string} accountId - The account ID to set.
     */
    public setAccountId(accountId: string): void {
        this.ari.accountId = accountId;
    }

    /**
     * Get the account ID of the ARI.
     * 
     * @returns {string} The account ID of the ARI.
     */
    public getAccountId(): string {
        return this.ari.accountId;
    }

    /**
     * Set the resource of the ARI.
     * 
     * @param {string} resource - The resource to set.
     */
    public setResource(resource: string): void {
        this.ari.resource = resource;
    }

    /**
     * Get the resource of the ARI.
     * 
     * @returns {string} The resource of the ARI.
     */
    public getResource(): string {
        return this.ari.resource;
    }

    /**
     * Convert the ARI object to a string.
     * 
     * @returns {string} The ARI as a string.
     */
    public toString(): string {
        const { prefix, namespace, service, region, accountId, resource } = this.ari;
        return `${prefix}:${namespace}:${service}:${region}:${accountId}:${resource}`;
    }

    /**
     * Convert the ARI object to JSON format.
     * 
     * @returns {ARI} The ARI as a JSON object.
     */
    public toJSON(): ARI {
        return this.ari;
    }

    /**
     * Create an AgsiriAri instance from an ARI string.
     * 
     * @param {string} ariString - The ARI string to convert.
     * @returns {AgsiriAri} The AgsiriAri instance.
     */
    public static fromString(ariString: string): AgsiriAri {
        const parts = ariString.split(':');
        if (parts.length !== 6) {
            throw new Error('Invalid ARI format');
        }
        const [prefix, namespace, service, region, accountId, resource] = parts;
        return new AgsiriAri({ prefix, namespace, service, region, accountId, resource });
    }

    /**
     * Create an AgsiriAri instance from a JSON object.
     * 
     * @param {ARI} ariJson - The ARI JSON object to convert.
     * @returns {AgsiriAri} The AgsiriAri instance.
     */
    public static fromJSON(ariJson: ARI): AgsiriAri {
        return new AgsiriAri(ariJson);
    }
}

