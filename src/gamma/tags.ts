/**
 * Gamma API Tags endpoints.
 */

import { HttpClient } from '../http';
import { Tag, TagsListParams } from '../types/gamma';

export class TagsAPI {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * List tags with optional filtering.
     * @param params - Query parameters
     * @returns List of tags
     */
    async getList(params?: TagsListParams): Promise<Tag[]> {
        return this.client.get('/tags', params) as Promise<Tag[]>;
    }

    /**
     * Get a tag by ID.
     * @param id - Tag ID
     * @returns Tag object
     */
    async get(id: string): Promise<Tag> {
        return this.client.get(`/tags/${id}`) as Promise<Tag>;
    }

    /**
     * Get a tag by slug.
     * @param slug - Tag slug
     * @returns Tag object
     */
    async getBySlug(slug: string): Promise<Tag> {
        return this.client.get(`/tags/slug/${slug}`) as Promise<Tag>;
    }
}
