import renderer from "react-test-renderer";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Container, {
  View,
  toggleStatus,
  handleAddTask,
  filter,
  handleFilterStatus,
} from "../App.old";

describe("App old way", () => {
  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });
  describe("testing pure functions", () => {
    test("toggleStatus", () => {
      const mockSetTask = jest.fn();

      toggleStatus(mockSetTask)(2);
      const callback = mockSetTask.mock.calls[0][0];

      expect(
        callback([
          { completed: false },
          { completed: false },
          { completed: false },
          { completed: false },
        ])
      ).toStrictEqual([
        { completed: false },
        { completed: false },
        { completed: true },
        { completed: false },
      ]);
    });

    test("handleAddTask should add task to the list", () => {
      const mockSetTasks = jest.fn();

      handleAddTask(mockSetTasks, jest.fn())("new item");
      const callback = mockSetTasks.mock.calls[0][0];

      expect(callback([{ value: 1 }, { foo: 2 }])).toStrictEqual([
        { value: 1 },
        { foo: 2 },
        { id: 3, label: "new item", completed: false },
      ]);
    });

    test("handleAddTask should reset newTodo to empty", () => {
      const mockSetNewTodo = jest.fn();

      handleAddTask(jest.fn(), mockSetNewTodo)("new item");
      const callback = mockSetNewTodo.mock.calls[0][0];

      expect(callback()).toEqual("");
    });

    const mockData = [
      {
        id: 0,
        label: "active 1",
        completed: false,
      },
      {
        id: 1,
        label: "completed 1",
        completed: true,
      },
      {
        id: 2,
        label: "active 2",
        completed: false,
      },
      {
        id: 3,
        label: "completed 2",
        completed: true,
      },
    ];
    test.each([
      ["all", mockData],
      [
        "completed",
        [
          {
            id: 1,
            label: "completed 1",
            completed: true,
          },
          {
            id: 3,
            label: "completed 2",
            completed: true,
          },
        ],
      ],
      [
        "active",
        [
          {
            id: 0,
            label: "active 1",
            completed: false,
          },
          {
            id: 2,
            label: "active 2",
            completed: false,
          },
        ],
      ],
      ["unknown", undefined],
    ])(
      "filter should keep items with matching status (%p)",
      (filterStatus, expectedTasks) => {
        expect(filter({ tasks: mockData, filterStatus })).toStrictEqual(
          expectedTasks
        );
      }
    );

    test("handleFilterStatus", () => {
      const mockSetFilterStatus = jest.fn();
      handleFilterStatus(mockSetFilterStatus)({ target: { value: 55 } });
      expect(mockSetFilterStatus).toHaveBeenCalledWith(55);
    });
  });

  describe("container", () => {
    test("it should render without crashing", () => {
      const tree = renderer.create(<Container />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe("view component", () => {
    const defaultProps = {
      filteredTasks: [],
      filterStatus: "all",
      newTodo: "",
      toggleStatus: jest.fn(),
      handleFilterStatus: jest.fn(),
      setNewTodo: jest.fn(),
      handleAddTask: jest.fn(),
    };

    test("initial state", () => {
      const tree = renderer.create(<View {...defaultProps} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    test("with tasks", () => {
      const props = {
        ...defaultProps,
        filteredTasks: [
          { id: 1, label: "first task", completed: false },
          { id: 2, label: "first task", completed: true },
        ],
      };
      const tree = renderer.create(<View {...props} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    test("with new todo", () => {
      const props = {
        ...defaultProps,
        newTodo: "new task",
      };
      const tree = renderer.create(<View {...props} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    test("filter click should call handleFilterStatus", () => {
      const wrapper = shallow(<View {...defaultProps} />);
      const input = wrapper.find("input[type='radio']").at(0);

      input.simulate("change", { checked: true });
      expect(defaultProps.handleFilterStatus).toHaveBeenCalledWith({
        checked: true,
      });
    });

    test("toggle status of item should call toggleStatus", () => {
      const props = {
        ...defaultProps,
        filteredTasks: [
          { id: 1, label: "first task", completed: false },
          { id: 2, label: "first task", completed: true },
        ],
      };

      const wrapper = shallow(<View {...props} />);
      const input = wrapper.find("li.task").at(1);

      input.simulate("click");
      expect(defaultProps.toggleStatus).toHaveBeenCalledWith(1);
    });

    test("typing in new todo input should call setNewTodo", () => {
      const wrapper = shallow(<View {...defaultProps} />);
      const input = wrapper.find("input[type='text']");

      input.simulate("change", { target: { value: "newValue" } });
      expect(defaultProps.setNewTodo).toHaveBeenCalledWith("newValue");
    });

    test("click the add button should call handleAddTask", () => {
      const props = { ...defaultProps, newTodo: "new value to set" };
      const wrapper = shallow(<View {...props} />);
      const input = wrapper.find("button");

      input.simulate("click", { target: { value: "newValue" } });
      expect(props.handleAddTask).toHaveBeenCalledWith(props.newTodo);
    });
  });
});
