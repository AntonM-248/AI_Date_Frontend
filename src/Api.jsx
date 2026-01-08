const baseUrl = "http://localhost:8080/"

export const fetchRandomProfile = async () => {
    const response = await fetch(baseUrl + "profiles/random");
    if(!response.ok) {
        throw new Error("Failed to fetch profile");
    }
    return response.json();
}

export const saveSwipe = async (profileId) => {
    const response = await fetch(baseUrl + 'matches', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({profileId})
    });
    if(!response.ok) {
        throw new Error('Failed to save swipe');
    }
}

export const fetchMatches = async () => {
    const response = await fetch(baseUrl + 'matches', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    });
    if(!response.ok) {
        throw new Error('Failed to retrieve matches');
    }
    return response.json();
}

export const fetchConversation = async (conversationId) => {
    console.log("fetching conversation: " + conversationId);
    const response = await fetch(`${baseUrl}conversations/${conversationId}`)
    if (!response.ok) {
        throw new Error('Failed to fetch conversation');
    }
    return response.json();
}

export const sendMessage = async (conversationId, message) => {
    const response = await fetch(`${baseUrl}conversations/${conversationId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messageText: message, authorId: "user" })
    });
    if (!response.ok) {
        throw new Error('Failed to send message');
    }
    return response.json();
}