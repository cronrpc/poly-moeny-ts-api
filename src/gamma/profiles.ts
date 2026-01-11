/**
 * Gamma API Profiles endpoints.
 */

import { HttpClient } from '../http';
import { Profile } from '../types/gamma';

export class ProfilesAPI {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * Get a profile by address.
     * 
     * @param address - Ethereum wallet address
     * @returns Profile object
     * 
     * @example
     * ```typescript
     * const profile = await client.gamma.profiles.get('0x1234...');
     * console.log(profile.name, profile.bio);
     * ```
     */
    async get(address: string): Promise<Profile> {
        return this.client.get(`/profiles/${address}`) as Promise<Profile>;
    }
}
