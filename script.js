/**
 * Constants
 */
const active_color = "black";
const active_label = "Deactivate";

const inactive_color = "dimgrey";
const inactive_label = "Activate";

const storage_key_name = "button_state";
const storage_active_value = "active";
const storage_inactive_value = "inactive";

/**
 * Storage
 */
function update_storage_value(value) {
    localStorage.setItem(storage_key_name, value);
}

function remove_storage_key(value) {
    localStorage.removeItem(storage_key_name);
}

function get_storage_value() {
    return localStorage.getItem(storage_key_name);
}

function is_storage_value_active() {
    return get_storage_value() === storage_active_value;
}

function init_storage_value() {
    update_storage_value(storage_inactive_value);
}

/**
 * Page refresh
 */
function page_refreshed() {
    const navigationEntries = performance.getEntriesByType('navigation');
    return navigationEntries.length > 0 && navigationEntries[0].type === 'reload';
}

/**
 * Button state
 */
function activate_button() {
    const body = document.body;
    const the_button = document.getElementById("the-button");

    body.style.backgroundColor = active_color;
    the_button.textContent = active_label;
    update_storage_value(storage_active_value);
}

function deactivate_button() {
    const body = document.body;
    const the_button = document.getElementById("the-button");

    body.style.backgroundColor = inactive_color;
    the_button.textContent = inactive_label;
    update_storage_value(storage_inactive_value);
}

function change_button_state() {
    const body = document.body;
    const currentColor = body.style.backgroundColor;

    if (currentColor === inactive_color || currentColor === "") {
        activate_button();
    } else {
        deactivate_button();
    }
}

/**
 * Main
 */
document.addEventListener('DOMContentLoaded', (event) => {
    const the_button = document.getElementById("the-button");

    if (page_refreshed()) {
        console.log('Page was refreshed');

        if (is_storage_value_active())
            activate_button();
    } else {
        init_storage_value();
        console.log('Page was not refreshed');
    }

    the_button.addEventListener('click', function() {
        change_button_state();
    });
});

//
// window.addEventListener('beforeunload', function () {
//     remove_storage_key();
// });
