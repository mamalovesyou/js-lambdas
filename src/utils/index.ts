
export const FormatTimeAgo = (time: number) => {

    const ago = Math.floor((Date.now() - time)/1000);
    switch (true) {
        case (ago < 10):
            return 'just now'
        case (ago < 60):
            return `${ago} seconds ago`
        case (ago < 3600):
            return `${Math.floor(ago/60)} minutes ago`
        default:
            return `${Math.floor(ago/3600)} hours ago`
    }
}