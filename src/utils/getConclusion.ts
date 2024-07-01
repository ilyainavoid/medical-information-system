export const getConclusion = (conclusionType: string): string => {
    switch (conclusionType) {
        case 'Disease':
            return 'Болезнь'
        case 'Death':
            return 'Смерть'
        case 'Recovery':
            return 'Выздоровление'
        default:
            return '';
    }
}