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
        imageSrc: [],
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
    let arr2;
    if (image1) {
        arr2 = "../assests/WhatsApp Image 2024-02-09 at 15.48.53_9736ba1b.jpg"
    }
    //     arr2.push("../assests/WhatsApp Image 2024-02-09 at 15.48.53_9736ba1b.jpg");
    // }
    // if (image2) {
    //     arr2.push("../assests/WhatsApp Image 2024-02-09 at 15.48.58_15abe770.jpg")
    // }
    // if (image3) {
    //     arr2.push("../assests/WhatsApp Image 2024-02-09 at 15.49.23_5ff7c590.jpg")
    // }
    // if (image4) {
    //     arr2.push("../assests/WhatsApp Image 2024-02-09 at 15.49.23_ae802d2b.jpg")
    // }


    obj.department = arr;
    obj.imageSrc = arr2;
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

function deleteRecord(obj) {
    $.ajax({
        url: "http://localhost:3000/data",
        method: "delete",
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
$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:3000/data',
        type: 'GET',
        success: function (data) {
            console.log(data);

            data.forEach(element => {
                //console.log(element.imageSrc);
                var nRow = "<tr><td>" + element.name + "</td><td>" + element.gender + "</td><td>" +
                    element.department + "</td><td>" + element.salary + "</td><td>" + element.note + "</td><td><button>🗑️</button><button>📝</button>"
                $("#table").append(nRow)
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data : ', error);
        }
    })
})
















document.getElementById("Submit").addEventListener("click", function () {
    subDetails();
});

document.getElementById("Submit").addEventListener("click", function () {
    deleteRecord();
});