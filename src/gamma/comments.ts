/**
 * Gamma API Comments endpoints.
 */

import { HttpClient } from '../http';
import { Comment, CommentsListParams } from '../types/gamma';

export class CommentsAPI {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * List comments with optional filtering.
     * @param params - Query parameters
     * @returns List of comment objects
     */
    async getList(params?: CommentsListParams): Promise<Comment[]> {
        return this.client.get('/comments', params) as Promise<Comment[]>;
    }

    /**
     * Get a comment by ID.
     * @param id - Comment ID
     * @returns Comment object
     */
    async get(id: string): Promise<Comment> {
        return this.client.get(`/comments/${id}`) as Promise<Comment>;
    }
}
