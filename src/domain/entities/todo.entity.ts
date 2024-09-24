export class TodoEntity {
    constructor(
        public id: string,
        public text: string,
        public completedAt: Date|null,
    ) { }

    get isCompleted() {
        return !!this.completedAt 
    }

    public static fromObject(object: {[key:string]: any }) : TodoEntity {
        const { id, text, completedAt } = object
        if (!id) throw  'Id is requered';
        if (!text) throw  'Text is requered';

        let newCompletedAt;
        if ( completedAt ) {
            newCompletedAt = new Date(completedAt);
            if (isNaN( newCompletedAt.getTime() ) ) {
                throw 'CompletedAt is not a valid Date';
            }
        }
       return  new TodoEntity(id, text, completedAt)
    }
}