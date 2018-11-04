import { html } from '@tiny-lit/core/lib/cjs';
import { Element } from '@tiny-lit/element/lib/cjs';
import style from './style.js';

function prevented(f) {
    return e => {
        e.stopPropagation();
        e.preventDefault();
        f(e);
    };
}

function loadStorage(defaultValue) {
    const s = localStorage.getItem('todoMvc');
    return s ? JSON.parse(s) : defaultValue;
}

function saveStorage(value) {
    window.requestAnimationFrame(() =>
        localStorage.setItem('todoMvc', JSON.stringify(value))
    );
}

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

class TodoMVC extends Element {
    constructor() {
        super();
        this.state = loadStorage({
            todos: [],
            filter: null,
        });
    }

    static get is() {
        return 'todo-mvc';
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
                    completed: false,
                    id: Math.random()
                        .toString()
                        .substr(2),
                },
            ],
        });
        e.target.reset();
    }

    handleDeleteTodo(remove) {
        this.setState({
            todos: [...this.state.todos.filter(todo => todo !== remove)],
        });
    }

    switchCompleted(index) {
        const todos = this.state.todos;

        todos[index].completed = !todos[index].completed;
        this.setState({
            todos: [...todos],
        });
    }

    handleClearCompleted() {
        this.setState({
            todos: [...this.state.todos.filter(todo => !todo.completed)],
        });
    }

    render() {
        const { filter, todos } = this.state;

        return html`
            ${style}
            <section class="todoapp body">
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
                        ${todos
                                .map(
                                    (todo, index) => (
                                        (todo.index = index), todo
                                    )
                                )
                                .filter(
                                    todo =>
                                        filter === null ||
                                        todo.completed === filter
                                ).map(
                            todo =>
                                html`
                            <li class=${todo.completed ? 'completed' : ''}>
                                <div
                                    class="view"
                                >
                                    <input
                                        class="toggle"
                                        type="checkbox"
                                        checked=${todo.completed}
                                        onClick=${prevented(() =>
                                            this.switchCompleted(todo.index)
                                        )}
                                    />
                                    <label onClick=${prevented(() =>
                                        this.switchCompleted(todo.index)
                                    )}>${todo.text}</label>
                                    <button class="destroy" onClick=${prevented(
                                        () => this.handleDeleteTodo(todo)
                                    )}></button>
                                </div>
                                <input class="edit" value=${todo.text} />
                            </li>
                        `.withKey(todo.id)
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
                                class=${filter === null && 'selected'}
                                href="#/"
                                onClick=${prevented(() => this.setFilter(null))}
                            >
                                All
                            </a>
                        </li>
                        <li>
                            <a
                                class=${filter === false && 'selected'}
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
                                class=${filter && 'selected'}
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
                    <button class="clear-completed shuffle" onClick=${prevented(
                        () =>
                            this.setState({ todos: shuffle(this.state.todos) })
                    )}>Shuffle</button>
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
