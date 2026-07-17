import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { FloatingRateService } from './floating-rate.service';

describe('FloatingRateService', () => {
  let service: FloatingRateService;

  beforeEach(() => {
    vi.useFakeTimers();

    TestBed.configureTestingModule({});
    service = TestBed.inject(FloatingRateService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the floating rate every 3 seconds', () => {
    // Arrange
    vi.spyOn(service as any, 'getVariation').mockReturnValue(0.0005);

    const initialRate = service.currentRate();

    // Act
    vi.advanceTimersByTime(3000);

    // Assert
    expect(service.currentRate()).toBe(initialRate + 0.0005);
  });
});