export type ArithmeticCommands = 
                          'add' |
                          'sub' |
                          'neg' |
                          'eq'  |
                          'gt'  |
                          'lt'  |
                          'and' |
                          'or'  |
                          'not';
export function getArithmeticCommands(): Array<string> {
    return ['add', 'sub', 'neg', 'eq', 'gt', 'lt', 'and', 'or', 'not'];
}
