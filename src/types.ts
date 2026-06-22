/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CoreProject {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  designs: string[];
  results: {
    label: string;
    value: string;
    desc?: string;
  }[];
  reflection: string;
}

export interface ExplorationProject {
  id: string;
  name: string;
  tagline: string;
  status: string;
  highlights: string[];
  tags: string[];
  hasDemo: boolean;
  linkType?: 'demo' | 'page' | 'none';
}

export interface CapabilityNode {
  id: number;
  name: string;
  description: string;
  details: string;
}

export interface ProjectMapping {
  projectName: string;
  mappings: {
    nodeId: number;
    action: string;
    result: string;
  }[];
}
