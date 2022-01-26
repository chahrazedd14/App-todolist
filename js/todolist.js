const modal = document.querySelector(".modal");
const btnAddTask = document.querySelector(".btn-add-task123");
const btnCancelTask = document.querySelector(".btn-cancel-task");
const iptToggleModal = document.querySelector("#ipt-toggle-modal");
let isEditing = false;
let editingTaskIndex = "";

//popUp = document.querySelector(".btn-remove-task")
//popUp.onclick = (e) => {
    //document.querySelector(".deleteBox").style.opacity = "1";
//}

function openEditModal(id) {

   

    document.querySelector(".overlay > p").innerText = "Edit task";

    document.querySelector(".btn-add-task123").innerText = "Update";

    document.querySelectorAll(".task").forEach((task, index) => {
        task.classList.add("swipe-right");
        task.style.transitionDelay = index * 0.02 + "s";
    });

    document.querySelector("#task_title").focus();

    iptToggleModal.checked = true;

   // $("#formxx").attr("action", "/updatetodolist123");

    $.ajax({
        type: "POST",
        url: "/get_todo",
        data: { id: id },
        success: function (response) {
            var response = JSON.parse(response);

            $("#id").val(response.id);

            $("#task_title").val(response.task_title);
            $("#task_desc").val(response.task_desc);

            $('.btn-add-task123').attr('type','button');
            $('.btn-add-task123').attr('onClick', 'updateTodo();');

            if (response.task_priority == "high") {
                $("#high").attr("checked", "checked");
            } else if (response.task_priority == "medium") {
                $("#medium").attr("checked", "checked");
            } else if (response.task_priority == "low") {
                $("#low").attr("checked", "checked");
            }
        }
    });
}


function updateTodo()
{
    $.ajax({
        type: "POST",
        url: "/updatetodolist123456",
        data: { id: $('#id').val(), task_title: $('#task_title').val(), task_desc: $('#task_desc').val(), task_priority: $('input[name=task_priority]:checked').val() },
        success: function (response) {

        },
    });
    setTimeout(() => {
        document.location.reload();
    }, 1500);
}

function completeTask123(id, el) {
    $.ajax({
        type: "POST",
        url: "/complete_task123",
        data: { id: id },
        success: function (response) {
            const btn = el == undefined ? this : el;
            const task = btn.parentNode.parentNode.parentNode;

            task.classList.toggle("-is-completed");

            $("#notification").html("Task Completed Successfully!");

            document.querySelector(".notification").classList.add("-is-shown");

            setTimeout(() => {
                document.querySelector(".notification").classList.remove("-is-shown");
            }, 1000);

            //document.location.reload();
        },
    });
}

function removeTask123(id) {


    let text = "Press a button!\nEither OK or Cancel.";
    if (confirm(text) == true) {
        $.ajax({
            type: "POST",
            url: "/delete_task123",
            data: { id: id },
            success: function (response) {
                document.location.reload();
            },
        });
    } else {
        text = "You canceled!";
        alert(text);
    }

}



btnCancelTask.addEventListener("click", () => {
    iptToggleModal.checked = false;
    modal.reset();
    document.querySelectorAll(".task").forEach((task) => {
        task.classList.remove("swipe-right");
    });
});

function checkGridClass() {
    document.onmousemove = (e) => {
        var task = document.querySelectorAll(".task");
        task.forEach((v) => {
            var taskClassList = v.className.toString().split(" ");
            taskClassList.forEach((v2) => {
                if (!v.className.startsWith("grid-item")) {
                    v.classList.add("grid-item");
                }
            });
        });
    };
}

checkGridClass();

document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape" && iptToggleModal.checked) {
        iptToggleModal.checked = false;
        modal.reset();
        document.querySelectorAll(".task").forEach((task) => {
            task.classList.remove("swipe-right");
        });
    }

    if (evt.key === "+" && !iptToggleModal.checked) {
        document.querySelector(".overlay > p").innerText = "Add task";
        document.querySelector(".btn-add-task").innerText = "Add";

        iptToggleModal.checked = true;
        document.querySelectorAll(".task").forEach((task) => {
            task.classList.add("swipe-right");
        });

        setTimeout(() => {
            document.querySelector("#task_title").focus();
        }, 500);
    }
});

iptToggleModal.addEventListener("change", function () {

    if (this.checked) {

        document.querySelector(".overlay > p").innerText = "Add task";
        //document.querySelector(".btn-add-task").innerText = "Add";

        document.querySelectorAll(".task").forEach((task, index) => {
            task.classList.add("swipe-right");
            task.style.transitionDelay = index * 0.02 + "s";
        });

        document.querySelector("#task_title").focus();



    } else {

        modal.reset();
        document.querySelectorAll(".task").forEach((task) => {
            task.classList.remove("swipe-right");
        });
    }
});

function addTodo(){

    $.ajax({
        type: "POST",
        url: "/addtodolist123456",
        data: { task_title: $('#task_title').val(), task_desc: $('#task_desc').val(), task_priority: $('input[name=task_priority]:checked').val() },
        success: function (response) {

        },
    });
    setTimeout(() => {
        document.location.reload();
    }, 1500);
}



function removeTask(task_id) {



    swal({
        title: "Are you sure you want to delete?",
        text: "",
        type: "",
        showCancelButton: true,
        confirmButtonColor: "#38B87C",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        closeModal: false,
        closeOnConfirm: false,
        closeOnCancel: true
    },
        function (isConfirm) {
            if (isConfirm) {
                $('.sweet-alert h2').text('Deleting...').css({ 'color': 'red' });
                $('.sa-button-container').html('');

                setTimeout(() => {
                    $('.sweet-alert h2').text('Deleted!').css({ 'color': 'red' });
                }, 1000);

                setTimeout(() => {
                    swal.close();
                }, 1500);

              



                $.ajax({
                    type: "POST",
                    url: "/delete_task123",
                
                    data: { id: task_id },
                    success: function (response) {


                        const task = document.getElementById("task_" + task_id);

                        task.classList.add("-is-removed");

                        document.location.reload();
                    },
                });

                setTimeout(() => {
                    const task = document.getElementById("task_" + task_id);
                    task.remove();
                }, 2000);

                /*  setTimeout(() => {
                     const task = document.getElementById("task_" + task_id);
                     task.parentElement.removeChild(task);
                 }, 2500); */

            } else {

                //swal("Hurray", "Account is not removed!", "error");  

            }
        });
}