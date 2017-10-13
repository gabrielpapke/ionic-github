export class User {
    
        constructor(
            public id?: number,
            public login?: string,
            public followers?: number,
            public following?: number,
            public avatar_url?: string,
            public email?: string,
            public bio?: string
        ) { }
    
    }
    