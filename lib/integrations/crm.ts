// ============================================
// WHAT THIS FILE DOES (plain English):
// This describes how to send a new lead to a CRM.
// Personal CRM and Uspot will both follow the same shape.
// Feature flags will choose which one runs later.
// ============================================

// THIS SECTION DOES: name the fields we collect from a contact or chat lead
export type LeadPayload = {
  name: string;
  email: string;
  message: string;
  topic?: string;
};

// THIS SECTION DOES: define the tiny contract every CRM connector must follow
export type CrmConnector = {
  createLead: (data: LeadPayload) => Promise<{ ok: boolean; error?: string }>;
};

// THIS SECTION DOES: provide a stand-in CRM that always reports "not configured"
export const stubCrm: CrmConnector = {
  async createLead() {
    return { ok: false, error: "CRM connector not configured yet." };
  },
};
