// Core
import { Injectable } from "@angular/core";

// State
import { SharedState } from "./shared.state";

@Injectable()
export class SharedFacade {
  constructor(private sharedState: SharedState) {}

  isLoading() {
    return this.sharedState.getIsLoading();
  }

  setLoading(value: boolean) {
    this.sharedState.setIsLoading(value);
  }
}