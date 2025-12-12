import { TestBed } from '@angular/core/testing';
import { ToastService, ToastType } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService],
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show()', () => {
    it('should add toast to observable', (done) => {
      service.toasts$.subscribe((toasts) => {
        if (toasts.length > 0) {
          expect(toasts[0].message).toBe('Test message');
          expect(toasts[0].type).toBe('info');
          done();
        }
      });

      service.show('Test message', 'info');
    });

    it('should generate unique id for each toast', () => {
      service.show('Message 1', 'info');
      service.show('Message 2', 'info');

      const toasts = service['toastsSubject'].value;
      expect(toasts[0].id).not.toBe(toasts[1].id);
    });

    it('should use 3000ms duration by default', (done) => {
      service.toasts$.subscribe((toasts) => {
        if (toasts.length > 0) {
          expect(toasts[0].duration).toBe(3000);
          done();
        }
      });

      service.show('Test', 'info');
    });

    it('should accept custom duration', (done) => {
      service.toasts$.subscribe((toasts) => {
        if (toasts.length > 0) {
          expect(toasts[0].duration).toBe(5000);
          done();
        }
      });

      service.show('Test', 'info', 5000);
    });
  });

  describe('success()', () => {
    it('should create success toast', (done) => {
      service.toasts$.subscribe((toasts) => {
        if (toasts.length > 0) {
          expect(toasts[0].type).toBe('success');
          expect(toasts[0].message).toBe('Success!');
          done();
        }
      });

      service.success('Success!');
    });
  });

  describe('error()', () => {
    it('should create error toast', (done) => {
      service.toasts$.subscribe((toasts) => {
        if (toasts.length > 0) {
          expect(toasts[0].type).toBe('error');
          expect(toasts[0].message).toBe('Error!');
          done();
        }
      });

      service.error('Error!');
    });
  });

  describe('warning()', () => {
    it('should create warning toast', (done) => {
      service.toasts$.subscribe((toasts) => {
        if (toasts.length > 0) {
          expect(toasts[0].type).toBe('warning');
          expect(toasts[0].message).toBe('Warning!');
          done();
        }
      });

      service.warning('Warning!');
    });
  });

  describe('info()', () => {
    it('should create info toast', (done) => {
      service.toasts$.subscribe((toasts) => {
        if (toasts.length > 0) {
          expect(toasts[0].type).toBe('info');
          expect(toasts[0].message).toBe('Info!');
          done();
        }
      });

      service.info('Info!');
    });
  });

  describe('remove()', () => {
    it('should remove toast by id', () => {
      service.show('Test 1', 'info');
      service.show('Test 2', 'info');

      const toasts = service['toastsSubject'].value;
      const idToRemove = toasts[0].id;

      service.remove(idToRemove);

      const remainingToasts = service['toastsSubject'].value;
      expect(remainingToasts.length).toBe(1);
      expect(remainingToasts.find((t) => t.id === idToRemove)).toBeUndefined();
    });
  });

  describe('clear()', () => {
    it('should remove all toasts', () => {
      service.show('Test 1', 'info');
      service.show('Test 2', 'info');
      service.show('Test 3', 'info');

      service.clear();

      const toasts = service['toastsSubject'].value;
      expect(toasts.length).toBe(0);
    });
  });
});
