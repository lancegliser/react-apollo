import { FieldPolicy } from "@apollo/client/cache";

// Adapted from https://github.com/apollographql/apollo-client/blob/main/src/utilities/policies/pagination.ts#L33-L49
// to support our usage of IOffsetPagination
export interface IOffsetPaging {
  limit: number;
  offset: number;
  total: number;
}
type OffsetLimitPaginationItemsPolicy = () => FieldPolicy<
  IOffsetPaging & { items: any[] }
>;

// This policy provides a set size items array, allowing basic pagination.
export const offsetLimitItemsPaginationPolicy: OffsetLimitPaginationItemsPolicy =
  () => {
    return {
      // The merge function is run as new result is returned
      merge: (existing, incoming, { args }) => {
        const mergedItems: any[] = [];

        // Assume an offset of 0 if args.offset omitted.
        const { offset = 0 } = args || {};
        incoming.items.forEach((item, index) => {
          mergedItems[offset + index] = incoming.items[index];
        });

        return {
          ...existing,
          ...incoming,
          items: mergedItems,
        };
      },
      // The read function is called once before there's results
      // Then again after every merge
      read: (existing, incoming) => {
        if (!existing) {
          return;
        }

        const { args } = incoming;
        const offset: number = args?.offset || existing.offset || 0;
        const limit: number =
          args?.limit || existing.offset || existing.items?.length;

        return {
          ...existing,
          items: existing.items?.slice(offset, limit + offset) ?? [],
        };
      },
    };
  };

// This policy provides an ever increasing items array, allowing "load more" into
// the page for visualization. Think infinite scrolling.
export const offsetLimitItemsLoadMorePolicy: OffsetLimitPaginationItemsPolicy =
  () => {
    return {
      // The merge function is run as new result is returned
      merge: (existing, incoming, { args }) => {
        const mergedItems = existing?.items
          ? existing?.items.slice(0)
          : [...(existing?.items || [])];

        // Assume an offset of 0 if args.offset omitted.
        const { offset = 0 } = args || {};
        incoming.items.forEach((item, index) => {
          mergedItems[offset + index] = incoming.items[index];
        });

        return {
          ...existing,
          ...incoming,
          items: mergedItems,
        };
      },
      // The read function is called once before there's results
      // Then again after every merge
      read: (existing, incoming) => {
        if (!existing) {
          return;
        }

        const { args } = incoming;
        const offset: number = args?.offset || existing.offset || 0;
        const limit: number =
          args?.limit || existing.offset || existing.items?.length;

        return {
          ...existing,
          items: existing.items?.slice(0, limit + offset) ?? [],
        };
      },
    };
  };
