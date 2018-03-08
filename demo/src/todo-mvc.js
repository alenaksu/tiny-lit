import { html, render, collection, Element } from "../../src/index.ts";
import style from "./style.js";

function prevented(f) {
    return e => {
        e.preventDefault();
        f(e);
    };
}

function loadStorage(defaultValue) {
    const s = localStorage.getItem("todoMvc");
    return s ? JSON.parse(s) : defaultValue;
}

function saveStorage(value) {
    window.requestAnimationFrame(() =>
        localStorage.setItem("todoMvc", JSON.stringify(value))
    );
}

class TodoMVC extends Element {
    constructor() {
        super();
        this.state = loadStorage({
            todos: [],
            filter: null
        });
    }

    static get is() {
        return "todo-mvc";
    }

    setState(nextState) {
        super.setState(nextState);
        saveStorage(this.state);
    }

    setFilter(completed) {
        this.setState({ filter: completed });
    }

    handleAddTodo(e) {
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    text: e.target.elements[0].value,
                    completed: false
                }
            ]
        });
        e.target.reset();
    }

    handleDeleteTodo(remove) {
        this.setState({
            todos: [...this.state.todos.filter(todo => todo !== remove)]
        });
    }

    switchCompleted(index) {
        const todos = this.state.todos;

        todos[index].completed = !todos[index].completed;
        this.setState({
            todos: [...todos]
        });
    }

    handleClearCompleted() {
        this.setState({
            todos: [...this.state.todos.filter(todo => !todo.completed)]
        });
    }

    getTemplate() {
        const { filter, todos } = this.state;

        return html`
            <section class="todoapp">
                <header class="header">
                    <h1>todos</h1>
                    <form onSubmit=${prevented(e => this.handleAddTodo(e))}>
                        <input
                            class="new-todo"
                            placeholder="What needs to be done?"
                            autofocus
                        />
                    </form>
                </header>
                <!-- This section should be hidden by default and shown when there are todos -->
                <section class="main">
                    <input id="toggle-all" class="toggle-all" type="checkbox" />
                    <label for="toggle-all">Mark all as complete</label>
                    <ul class="todo-list">
                        <!-- These are here just to show the structure of the list items -->
                        <!-- List items should get the class \`editing\` when editing and \`completed\` when marked as completed -->
                        ${collection(
                            todos.filter(
                                todo =>
                                    filter === null || todo.completed === filter
                            ),
                            (todo, index) => html`
                            <li class=${todo.completed ? "completed" : ""}>
                                <div
                                    class="view"
                                >
                                    <input
                                        class="toggle"
                                        type="checkbox"
                                        checked=${todo.completed}
                                        onClick=${prevented(() =>
                                            this.switchCompleted(index)
                                        )}
                                    />
                                    <label onClick=${prevented(() =>
                                        this.switchCompleted(index)
                                    )}>${todo.text}</label>
                                    <button class="destroy" onClick=${prevented(
                                        () => this.handleDeleteTodo(todo)
                                    )}></button>
                                </div>
                                <input class="edit" value=${todo.text} />
                            </li>
                        `
                        )}
                    </ul>
                </section>
                <!-- This footer should hidden by default and shown when there are todos -->
                <footer class="footer">
                    <!-- This should be \`0 items left\` by default -->
                    <span class="todo-count">
                        <strong>${todos.filter(todo => !todo.completed).length}
                        </strong> item left
                    </span>

                    <ul class="filters">
                        <li>
                            <a
                                class=${filter === null && "selected"}
                                href="#/"
                                onClick=${prevented(() => this.setFilter(null))}
                            >
                                All
                            </a>
                        </li>
                        <li>
                            <a
                                class=${filter === false && "selected"}
                                href="#/active"
                                onClick=${prevented(() =>
                                    this.setFilter(false)
                                )}
                            >
                                Active
                            </a>
                        </li>
                        <li>
                            <a
                                class=${filter && "selected"}
                                href="#/completed"
                                onClick=${prevented(() => this.setFilter(true))}
                            >
                                Completed
                            </a>
                        </li>
                    </ul>
                    <!-- Hidden if no completed items are left ↓ -->
                    <button class="clear-completed" onClick=${prevented(() =>
                        this.handleClearCompleted()
                    )}>Clear completed</button>
                </footer>
            </section>
            <footer class="info">
                <p>Double-click to edit a todo</p>
                <!-- Change this out with your name and url ↓ -->
                <p>Created by <a href="http://todomvc.com">you</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        `;
    }
}

customElements.define(TodoMVC.is, TodoMVC);

render(style, document.head, true);
