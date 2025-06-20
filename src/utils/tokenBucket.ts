export class TokenBucket {
    private tokens: number;
    private lastRefill: number;
    
    constructor(
        private readonly capacity: number,     // max tokens
        private readonly refillRate: number,   // tokens per second
        private readonly refillInterval: number = 1000 // ms
    ) {
        this.tokens = capacity;
        this.lastRefill = Date.now();
    }
    
    consume(tokensRequested: number = 1): boolean {
        this.refill();
        
        if (this.tokens >= tokensRequested) {
            this.tokens -= tokensRequested;
            return true; // Request allowed
        }
        
        return false; // Request denied
    }
    
    private refill(): void {
        const now = Date.now();
        const timePassed = (now - this.lastRefill) / this.refillInterval;
        const tokensToAdd = timePassed * this.refillRate;
        
        this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
        this.lastRefill = now;
    }
}