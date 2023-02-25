import axios from "axios";

export const demoSrc =
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60'

export async function mockUpload(file) {
    const form = new FormData();
    form.append("file", file);

    const options = {
        method: 'PUT',
        url: '/api/upload',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzNjZiZmIzZmQ4MDQ0YzNmODYyZWVjNzU5MDA3ZmJkMCIsInN1YiI6IjIyIiwiaXNzIjoic2pnIiwiaWF0IjoxNjc3MzAxNjcyLCJleHAiOjE2NzczODgwNzJ9.EXGOr5ZyRdGI1twluC7piQetydE6Ylu79Zfr6ygz0ms',
            'content-type': 'multipart/form-data'
        },
        data: form
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

export async function mockUploadFail() {
    throw new Error('Fail to upload')
}