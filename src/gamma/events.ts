/**
 * Gamma API Events endpoints.
 */

import { HttpClient } from '../http';
import { Event, Tag, EventsListParams } from '../types/gamma';

export class EventsAPI {
    private client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    /**
     * List events with optional filtering.
     * 
     * @param params - Query parameters for filtering events
     * @returns List of event objects
     * 
     * @example
     * ```typescript
     * const events = await client.gamma.events.getList({
     *   active: true,
     *   featured: true,
     *   limit: 10,
     *   order: 'volume'
     * });
     * ```
     */
    async getList(params?: EventsListParams): Promise<Event[]> {
        return this.client.get('/events', params) as Promise<Event[]>;
    }

    /**
     * Get an event by ID.
     * 
     * @param eventId - The unique identifier of the event
     * @returns Complete event object with all fields and nested markets
     * 
     * @example
     * ```typescript
     * const event = await client.gamma.events.get('12345');
     * console.log(event.title, event.markets?.length);
     * ```
     */
    async get(eventId: string): Promise<Event> {
        return this.client.get(`/events/${eventId}`) as Promise<Event>;
    }

    /**
     * Get an event by slug.
     * 
     * @param slug - The URL-friendly identifier of the event
     * @returns Complete event object
     * 
     * @example
     * ```typescript
     * const event = await client.gamma.events.getBySlug('2024-us-presidential-election');
     * ```
     */
    async getBySlug(slug: string): Promise<Event> {
        return this.client.get(`/events/slug/${slug}`) as Promise<Event>;
    }

    /**
     * Get tags associated with an event.
     * 
     * @param eventId - The unique identifier of the event
     * @returns List of tag objects
     */
    async getTags(eventId: string): Promise<Tag[]> {
        return this.client.get(`/events/${eventId}/tags`) as Promise<Tag[]>;
    }
}
