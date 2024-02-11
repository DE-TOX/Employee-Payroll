function subDetails() {
    var name = $('#name').val();
    var gender = $('#gender').is(':checked');
    var image1 = $('#profile1').is(':checked');
    var image2 = $('#profile2').is(':checked');
    var image3 = $('#profile3').is(':checked');
    var image4 = $('#profile4').is(':checked');
    var department1 = $('#dept1').is(':checked');
    var department2 = $('#dept2').is(':checked');
    var department3 = $('#dept3').is(':checked');
    var department4 = $('#dept4').is(':checked');
    var department5 = $('#dept5').is(':checked');
    var salary = $('#salary').val();

    var note = jQuery('#notes').val();
    const obj = {
        name: name,
        gender: gender ? "male" : "female",
        department: [],
        salary: salary,
        imageSrc: "" ,
        // date : date,
        note: note
    }
    let arr = [];
    if (department1) {
        arr.push("HR");
    }
    if (department2) {
        arr.push("Sales");
    }
    if (department3) {
        arr.push("Finance")
    }
    if (department4) {
        arr.push("Engineer")
    }
    if (department5) {
        arr.push("Others")
    }
    let proImage;
    if (image1) {
        proImage = "../assests/I1.jpg"
    }
    if (image2) {
        proImage = "../assests/I2.jpg"
    }
    if (image3) {
        proImage = "../assests/I3.jpg"
    }
    if (image4) {
        proImage = "../assests/I4.jpg"
    }


    obj.department = arr;
    obj.imageSrc = proImage
    $.ajax({
        url: "http://localhost:3000/data",
        method: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json",
        success: function (data) {
            console.log("Success:", data);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching data:", status, error);
            console.log("Server response:", xhr.responseText);
        }
    });
}


function deleteRecord(id) {
    $.ajax({
        url: "http://localhost:3000/data/" + id,
        method: "DELETE",
        success: function (data) {
            console.log("Success:", data);
            // Remove the deleted row from the table
            $('#row_' + id).remove();
        },
        error: function (xhr, status, error) {
            console.error("Error deleting record:", status, error);
            console.log("Server response:", xhr.responseText);
        }
    });
}


$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:3000/data',
        type: 'GET',
        success: function (data) {
            data.forEach(element => {
                var nRow = "<tr id='row_" + element.id + "'><td>" +"<img class = 'proImg' src ="+element.imageSrc+">"+element.name + "</td><td>" + element.gender + "</td><td>" +
                    element.department + "</td><td>" + element.salary + "</td><td>" + element.note + "</td><td><button class='delete-btn'>🗑️</button><button class='edit-btn'>📝</button></td></tr>";
                $("#table").append(nRow);
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data : ', error);
        }
    })
})
$(document).on('click', '.delete-btn', function() {
    var rowId = $(this).closest('tr').attr('id');
    var id = rowId.split('_')[1];
    deleteRecord(id);
});
















document.getElementById("Submit").addEventListener("click", function () {
    subDetails();
});

document.getElementById("Submit").addEventListener("click", function () {
    deleteRecord();
});