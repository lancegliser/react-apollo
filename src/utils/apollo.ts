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
        const mergedItems: any[] = existing?.items.slice() || [];

        // Assume an offset of 0 if args.offset omitted.
        const { offset = 0 } = args || {};
        incoming.items.forEach((item, index) => {
          mergedItems[offset + index] = incoming.items[index];
        });

        console.info("merge", incoming, {
          ...incoming,
          items: mergedItems,
        });
        return {
          ...incoming,
          items: mergedItems,
        };
      },
      // The read function is called once before there's results
      // Then again after every merge
      // read: (existing, incoming) => {
      //   if (!existing) {
      //     console.info("Read: No existing");
      //     return undefined;
      //   }
      //   console.info("read", {
      //     existing,
      //     incomingArgs: incoming.args,
      //   });
      //
      //   const offset: number =
      //     typeof incoming.args?.offset === "number" ? incoming.args.offset : 0;
      //   const limit: number =
      //     typeof incoming.args?.limit === "number"
      //       ? incoming.args.limit
      //       : existing.limit;
      //
      //   const items = existing.items?.slice(offset, limit + offset) || [];
      //   if (!items.length) {
      //     console.info("items not in cache, returning undefined");
      //     return undefined;
      //   }
      //
      //   console.info("read items", items);
      //   return {
      //     ...existing,
      //     offset,
      //     limit,
      //     items,
      //   };
      // },
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
          limit,
          offset,
          items: existing.items?.slice(0, limit + offset) ?? [],
        };
      },
    };
  };
