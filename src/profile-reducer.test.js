import profileReducer, { addPostAC, deletePost } from "./profile-reducer";

let state = {
    postData:[
    { id: 1, message: "Hi, how are you?" },
    { id: 2, message: "My first post" },
    { id: 3, message: "My second post" },
    { id: 4, message: "My third post" }
]};
test('new post should be added', () => {
    //test data
    let action = addPostAC("it-kamasutra.com")
    
    //test action
    let newState = profileReducer(state, action)

    expect(newState.postData.length).toBe(5)
})
test('delete post', () => {
    //test data
    let action = deletePost(1)
    
    //test action
    let newState = profileReducer(state, action)

    expect(newState.postData.length).toBe(3)
})