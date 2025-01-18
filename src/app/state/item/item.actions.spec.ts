import { ApiError } from 'src/app/core/models/error.model';
import { CourseApiActions } from './item.actions';

const mockApiError: ApiError = {
  message: 'Failed to fetch data',
  status: 500,
};

describe('CourseApiActions', () => {
  describe('GetItems', () => {
    it('should create an action to get items', () => {
      const expectedAction = {
        type: CourseApiActions.getCourses.type,
      };
      const action = CourseApiActions.getCourses();
      expect(action).toEqual(expectedAction);
    });

    it('should create course with an error', () => {
      const action = CourseApiActions.getCoursesFailure({
        error: mockApiError,
      });
      expect(action.error).toEqual(mockApiError);
    });
  });
});
