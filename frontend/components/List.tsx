// Copyright 2024 the JSR authors. All rights reserved. MIT license.
import { PaginationData } from "../util.ts";
import TbChevronRight from "tb-icons/TbChevronRight";
import { ComponentChildren } from "preact";

export interface ListDisplayItem {
  href: string;
  content: ComponentChildren;
  parentClass?: string;
}

export function ListDisplay(
  { title, pagination, currentUrl, children }: {
    title?: string;
    pagination?: PaginationData;
    currentUrl?: URL;
    children: ListDisplayItem[];
  },
) {
  return (
    <div class="mt-8 ring-1 ring-jsr-cyan-100 dark:ring-jsr-cyan-800 rounded overflow-hidden">
      {title &&
        (
          <div class="px-5 py-4 flex items-center justify-between border-b border-jsr-cyan-50 dark:border-jsr-cyan-900 bg-jsr-gray-50 dark:bg-jsr-cyan-800 leading-none">
            <span class="font-semibold">{title}</span>
            <div />
          </div>
        )}

      <ul class="divide-y">
        {children.map((item) => (
          <li class="border-jsr-cyan-50 dark:border-jsr-cyan-900">
            <a
              href={item.href}
              class={`group flex items-center px-5 py-3 gap-2 hover:bg-jsr-yellow-100 focus:bg-jsr-yellow-100 dark:hover:bg-jsr-yellow-500 dark:focus-visible:bg-jsr-yellow-500 focus:ring-2 ring-jsr-cyan-700 ring-inset outline-none ${
                item.parentClass ?? ""
              }`}
            >
              {item.content}

              <TbChevronRight class="text-jsr-cyan-800 dark:text-jsr-cyan-200 group-hover:dark:text-jsr-cyan-950 flex-shrink-0 size-6" />
            </a>
          </li>
        ))}
      </ul>

      {pagination && (
        <Pagination
          pagination={pagination}
          itemsCount={children.length}
          currentUrl={currentUrl!}
        />
      )}
    </div>
  );
}

function PaginationButton(props: {
  children: string;
  href: string;
}) {
  return (
    <a
      href={props.href}
      class="cursor-pointer relative inline-flex items-center rounded-md bg-white dark:bg-jsr-cyan-950 px-3 py-2 text-sm font-semibold text-jsr-gray-900 dark:text-white ring-1 ring-inset ring-jsr-gray-300 dark:ring-jsr-cyan-800 hover:bg-jsr-gray-50 hover:dark:bg-jsr-cyan-800 focus-visible:outline-offset-0 select-none"
    >
      {props.children}
    </a>
  );
}

function Pagination(
  { currentUrl, itemsCount, pagination }: {
    currentUrl: URL;
    itemsCount: number;
    pagination: PaginationData;
  },
) {
  const start = pagination.page * pagination.limit - pagination.limit;

  const prevURL = new URL(currentUrl);
  prevURL.searchParams.set("page", (pagination.page - 1).toString());
  const nextURL = new URL(currentUrl);
  nextURL.searchParams.set("page", (pagination.page + 1).toString());

  const hasPrevious = pagination.page > 1;
  const hasNext = pagination.limit * pagination.page < pagination.total;

  return (
    <nav
      class="flex items-center justify-between border-t border-jsr-cyan-900/10  dark:border-jsr-cyan-800 bg-white dark:bg-jsr-cyan-950 px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div class="hidden sm:block">
        <p class="text-sm text-jsr-gray-700 dark:text-jsr-gray-200">
          {start + itemsCount === 0 ? "No results found" : (
            <>
              Showing <span class="font-semibold">{start + 1}</span> to{" "}
              <span class="font-semibold">{start + itemsCount}</span>{" "}
              results, out of{" "}
              <span class="font-semibold">{pagination.total}</span>
            </>
          )}
        </p>
      </div>
      <div class="flex flex-1 justify-between sm:justify-end gap-2">
        {hasPrevious
          ? (
            <PaginationButton
              href={prevURL.pathname + prevURL.search}
            >
              Previous
            </PaginationButton>
          )
          : <span />}
        {hasNext
          ? (
            <PaginationButton
              href={nextURL.pathname + nextURL.search}
            >
              Next
            </PaginationButton>
          )
          : <span />}
      </div>
    </nav>
  );
}
