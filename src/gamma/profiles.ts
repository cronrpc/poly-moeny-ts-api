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
     * Get a public profile by address.
     * 
     * @param address - Ethereum wallet address (proxy wallet)
     * @returns Profile object with name, bio, profileImage, etc.
     * 
     * @example
     * ```typescript
     * const profile = await client.gamma.profiles.get('0x1234...');
     * console.log(profile.name, profile.bio, profile.profileImage);
     * ```
     */
    async get(address: string): Promise<Profile> {
        return this.client.get('/public-profile', { address }) as Promise<Profile>;
    }

    /**
     * Get a public profile by address (alias for get).
     * 
     * @param address - Ethereum wallet address (proxy wallet)
     * @returns Profile object
     */
    async getPublicProfile(address: string): Promise<Profile> {
        return this.get(address);
    }
}
