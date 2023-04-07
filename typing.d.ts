export interface Post {
    publishedAt: any;
    _id: string;
    _createdAt: string;
    kategorier: {
        string
    };
    title: string;
    plats: {
        name: string;
    }
    category: {
        name: string;
        title: string;
    }
    author: {
        name: string;
        image: string;
    };
    imgdescription: string;
    plats: string;
    marke: string;
    beskrivning: [object];

    description: string;
    huvudbild: {
        asset: {
            url: string;
        };
    };
    slug : {
        current: string;
    }
    body: [object];
}