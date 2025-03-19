#!/usr/bin/env node
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
async function callChatAPI() {
    try {
        const response = await axios.post(`${process.env.ONYX_API_BASE}/api/chat/send-message`, {
            alternate_assistant_id: 0,
            chat_session_id: "e22c4ae6-ad90-4375-9ba4-179cf3af618e",
            message: "Thông tin Sipher",
            prompt_id: 0,
            search_doc_ids: null,
            file_descriptors: [],
            regenerate: false,
            retrieval_options: {
                run_search: "auto",
                real_time: true,
                filters: {
                    source_type: null,
                    document_set: null,
                    time_cutoff: null,
                    tags: [],
                },
            },
            prompt_override: null,
            llm_override: {
                model_provider: "Default",
                model_version: "gpt-4o",
            },
            use_agentic_search: false,
            parent_message_id: null,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return JSON.parse(response.data.split(`{"agentic_message_ids": []}`)?.[1]);
    }
    catch (error) {
        console.log(error);
    }
}
async function makeOnyxRequest(url, body) {
    const headers = {
        "Content-Type": "application/json",
        "X-Onyx-Authorization": `Bearer ${process.env.ONYX_API_KEY}`,
    };
    try {
        const response = await axios.post(url, body, { headers });
        if (!response.data) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.data;
    }
    catch (error) {
        console.error("Error making Onyx request:", error);
        return null;
    }
}
async function makeOnyxRequestStream(url, body) {
    const headers = {
        "Content-Type": "application/json",
    };
    try {
        const response = await axios.post(url, body, { headers });
        if (!response.data) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = magicConvert(response.data);
        return res;
    }
    catch (error) {
        console.error("Error making Onyx request:", error);
        return null;
    }
}
const magicConvert = (data) => {
    try {
        return JSON.parse(data);
    }
    catch (error) {
        return JSON.parse(data.split(`{"agentic_message_ids": []}`)?.[1]);
    }
};
async function test() {
    const body = {
        alternate_assistant_id: 0,
        chat_session_id: "e22c4ae6-ad90-4375-9ba4-179cf3af618e",
        message: "Thông tin Sipher",
        prompt_id: 0,
        search_doc_ids: null,
        file_descriptors: [],
        regenerate: false,
        retrieval_options: {
            run_search: "auto",
            real_time: true,
            filters: {
                source_type: null,
                document_set: null,
                time_cutoff: null,
                tags: [],
            },
        },
        prompt_override: null,
        llm_override: {
            model_provider: "Default",
            model_version: "gpt-4o",
        },
        use_agentic_search: false,
        parent_message_id: null,
    };
    const res = (await makeOnyxRequestStream(`${process.env.ONYX_API_BASE}/api/chat/send-message`, body));
    return res?.message;
}
async function test2({ message }) {
    const searchUrl = `${process.env.ONYX_API_BASE}/api/chat/document-search`;
    const body = {
        message: message,
        search_type: "semantic",
        retrieval_options: {
            enable_auto_detect_filters: false,
            offset: 0,
            limit: 3,
            dedupe_docs: true,
        },
        evaluation_type: "skip",
        chunks_above: 1,
        chunks_below: 1,
        full_doc: false,
    };
    const documentSearchResponse = await makeOnyxRequest(searchUrl, body);
    if (!documentSearchResponse) {
        return {
            content: [
                {
                    type: "text",
                    text: `Failed to search for documents in the AtherOS's knowledge base`,
                },
            ],
        };
    }
    return {
        content: documentSearchResponse?.top_documents?.map((doc) => ({
            type: "text",
            text: doc.content + "\n" + doc.link,
        })) ?? [
            {
                type: "text",
                text: `No documents found in the AtherOS's knowledge base`,
            },
        ],
    };
}
// Call the function
test2({ message: "Thông tin Sipher" })
    .then((data) => {
    console.log(data);
})
    .catch((error) => {
    console.log(error);
});
