"use client";

import React, { useState } from "react";
import {  Drawer,  
    DrawerContent,  
    DrawerHeader,  
    DrawerBody,  
    DrawerFooter, 
    Button, 
    Input, 
    DatePicker, 
    TimeInput, 
    Card, 
    CardBody, 
    CardHeader, 
    CardFooter, 
    Divider, 
    RadioGroup, 
    Radio, 
    Textarea, 
    Calendar} 
    from "@heroui/react";

import { useDisclosure } from "@heroui/react";
import { Time, today, getLocalTimeZone } from "@internationalized/date";

export default function DrawerComponent() {
    // Disclosure hooks for main and nested drawers
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isNestedOpen, onOpen: onNestedOpen, onOpenChange: onNestedOpenChange} = useDisclosure();
    
    // Form fields states
    const [selectedOption, setSelectedOption] = useState("all-day");
    const [startTime, setStartTime] = useState(new Time(0, 0));
    const [endTime, setEndTime] = useState(new Time(23, 59));

    // new
    const [eventTitle, setEventTitle] = useState("");
    const [eventDate, setEventDate] = useState(today(getLocalTimeZone()));
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    // State for the list of events
    const [events, setEvents] = useState([]);

    // Handle radio button change for time selection
    const handleOptionChange = (value) => {
        setSelectedOption(value);

        if (value === "all-day") {
          setStartTime(new Time(0, 0));
          setEndTime(new Time(23, 59));
        }

    };

    // Handle form submission to save a new event
    const handleSaveEvent = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault(); // Ensure it's an event object before calling this
        }

        const newEvent = {
        title: eventTitle,
        date: eventDate,

        // Format time based on the option selected
        time: selectedOption === "all-day" ? "All Day" : `${startTime.toString()} - ${endTime.toString()}`,
        location,
        description,
        };
    
        // Add the new event to the events list
        setEvents([...events, newEvent]);

        // Reset form fields after saving
        setEventTitle("");
        setEventDate(today(getLocalTimeZone()));
        setLocation("");
        setDescription("");
        setSelectedOption("all-day");
        setStartTime(new Time(0, 0));
        setEndTime(new Time(23, 59));

        // Close the nested drawer
        onNestedOpenChange(false);

    };


  
    return (
      <>
        <Button onPress={onOpen}>Open Drawer</Button>

        <Drawer isOpen={isOpen} size="md" onOpenChange={onOpenChange}>
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1 justify-center items-center">School Calendar</DrawerHeader>
                
                <div className="flex justify-center items-center">
                    <Calendar 
                        classNames={{cell: "custom-cell", gridHeaderCell: "custom-header-cell"}} 
                        calendarWidth={350} 
                        isReadOnly 
                        aria-label="Date (Read Only)" 
                        value={today(getLocalTimeZone())} 
                    />
                </div>

                <br/>
                <div className="sticky top-0 bg-white z-10 p-1 pl-4 pb-2">
                    <h3 className="text-lg font-semibold">Upcoming Events</h3>
                </div>
                <hr/>

                <DrawerBody className="flex flex-col gap-4 overflow-y-scroll max-h-[50vh] px-5 scrollbar-hide">
                    
                    <div className="flex flex-col gap-2">

                        {events.length === 0 ? (
                            <p className="text-sm text-gray-500">No upcoming events</p>
                        ) : (
                            events.map((event, index) => (
                                <Card key={index} className="w-full p-1" classNames={{ header: "text-sm", body: "text-sm" }}>
                                    <CardHeader className="pr-1 pb-2 pt-1 font-medium">{event.title}</CardHeader>
                                    <Divider />
                                    <CardBody className="pb-0">{event.description}</CardBody>
                                    <CardFooter>
                                        Date: {event.date.toString()} | Time: {event.time}
                                    </CardFooter>
                                </Card>
                        ))
                        )}

                        {/* <Card className="w-full p-1" classNames={{header: "text-sm", body: "text-sm"}}>
                        <CardHeader className="pr-1 pb-2 pt-1 font-medium">Mathematics assignment</CardHeader>
                        <Divider />
                        <CardBody className="pb-0">Blank face in the windowpane. Made clear in seconds of life. Disappears and returns again. Counting hours searching the night.</CardBody>
                        <CardFooter>Date: 24/02/2025 | Time: 1.30 PM - 4.30 PM</CardFooter>
                        </Card>

                        <Card className="w-full p-1" classNames={{header: "text-sm", body: "text-sm"}}>
                        <CardHeader className="pr-1 pb-2 pt-1 font-medium">Deshiya makkal shakthi</CardHeader>
                        <Divider />
                        <CardBody className="pb-0">Kusata sagini hadata sogini inata warahali kabali ellaa</CardBody>
                        <CardFooter>Date: 12/11/2025 | Time: All Day</CardFooter>
                        </Card>

                        <Card className="w-full p-1" classNames={{header: "text-sm", body: "text-sm"}}>
                        <CardHeader className="pr-1 pb-2 pt-1 font-medium">Rabada dabada rabada dabada</CardHeader>
                        <Divider />
                        <CardBody className="pb-0">Rambari kiyapan ube numbare</CardBody>
                        <CardFooter>Deadline: 24/02/2025</CardFooter>
                        </Card>

                        <Card className="w-full p-1" classNames={{header: "text-sm", body: "text-sm"}}>
                        <CardHeader className="pr-1 pb-2 pt-1 font-medium">Mathematics assignment</CardHeader>
                        <Divider />
                        <CardBody className="pb-0">Blank face in the windowpane. Made clear in seconds of life. Disappears and returns again. Counting hours searching the night.</CardBody>
                        <CardFooter>Deadline: 24/02/2025</CardFooter>
                        </Card>

                        <Card className="w-full p-1" classNames={{header: "text-sm", body: "text-sm"}}>
                        <CardHeader className="pr-1 pb-2 pt-1 font-medium">Mathematics assignment</CardHeader>
                        <Divider />
                        <CardBody className="pb-0">Blank face in the windowpane. Made clear in seconds of life. Disappears and returns again. Counting hours searching the night.</CardBody>
                        <CardFooter>Deadline: 24/02/2025</CardFooter>
                        </Card> */}

                    </div>

                </DrawerBody>
                <hr/>            
                <DrawerFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onNestedOpen}>
                    Add New Event
                  </Button>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>

        <Drawer 
            isOpen={isNestedOpen} 
            onOpenChange={onNestedOpenChange} 
            disableAnimation={true} 
            backdrop="transparent" 
            placement="right"
        >
            <DrawerContent>
                {(onNestedClose) => (
                    <>
                        <DrawerHeader className="flex flex-col gap-1 justify-center items-center">Add New Event</DrawerHeader>
                            <DrawerBody>

                                {/* <form className="flex flex-col gap-4"> */}
                                    <Input 
                                        isRequired 
                                        label="Event Title" 
                                        placeholder="Add an event title" 
                                        maxLength={45} 
                                        value={eventTitle}
                                        onChange={(e) => setEventTitle(e.target.value)}
                                    />

                                    <DatePicker 
                                        label="Event Date" 
                                        isRequired
                                        value={eventDate}
                                        onChange={setEventDate}
                                    />

                                    <div className="flex flex-col gap-4">
                                        <RadioGroup orientation="horizontal" value={selectedOption} onValueChange={handleOptionChange}>
                                            <Radio value="all-day">All Day</Radio>
                                            <Radio value="specific-time" >Specific Time</Radio>
                                        </RadioGroup>

                                        <TimeInput 
                                            isRequired 
                                            label="Starting time" 
                                            isDisabled={selectedOption === "all-day"} 
                                            value={startTime} 
                                            onChange={setStartTime}
                                        />

                                        <TimeInput 
                                            isRequired 
                                            label="End time" 
                                            isDisabled={selectedOption === "all-day"} 
                                            value={endTime} 
                                            onChange={setEndTime}
                                        />

                                    </div>
                                    
                                    
                                    <Input 
                                        label="Location" 
                                        placeholder="Add a location" 
                                        maxLength={45}
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)} 
                                    />

                                    <Textarea 
                                        label="Description" 
                                        placeholder="Describe the event" 
                                        maxLength={315} 
                                        minRows={1} 
                                        maxRows={7} 
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />

                                    <DrawerFooter>
                                        <Button color="danger" variant="light" onPress={onNestedClose}>
                                            Cancel
                                        </Button>

                                        <Button color="primary" onPress={handleSaveEvent}>
                                            Save Event
                                        </Button>
                                    </DrawerFooter>
                                
                                {/* </form> */}

                            </DrawerBody>
                            
                    </>
                )}
            </DrawerContent>
        </Drawer>
      </>
    );
  }

  