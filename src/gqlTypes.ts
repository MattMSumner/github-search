

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchIssues
// ====================================================

export interface searchIssues_search_edges_textMatches_highlights {
  beginIndice: number;  // The indice in the fragment where the matched text begins.
  endIndice: number;    // The indice in the fragment where the matched text ends.
  text: string;         // The text matched.
}

export interface searchIssues_search_edges_textMatches {
  fragment: string;                                                // The specific text fragment within the property matched on.
  highlights: searchIssues_search_edges_textMatches_highlights[];  // Highlights within the matched fragment.
  property: string;                                                // The property matched on.
}

export interface searchIssues_search_edges_node_PullRequest {}

export interface searchIssues_search_edges_node_Issue {
  title: string;  // Identifies the issue title.
  url: any;       // The HTTP URL for this issue
}

export type searchIssues_search_edges_node = searchIssues_search_edges_node_PullRequest | searchIssues_search_edges_node_Issue;

export interface searchIssues_search_edges {
  cursor: string;                                                        // A cursor for use in pagination.
  textMatches: (searchIssues_search_edges_textMatches | null)[] | null;  // Text matches on the result found.
  node: searchIssues_search_edges_node | null;                           // The item at the end of the edge.
}

export interface searchIssues_search {
  edges: (searchIssues_search_edges | null)[] | null;  // A list of edges.
}

export interface searchIssues {
  search: searchIssues_search;  // Perform a search across resources.
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================