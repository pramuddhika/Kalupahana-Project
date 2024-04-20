

//################### send next 3 dates to booking form ##########################################
export const nextDates = (req, res) => {
    const dates = [];
    for (let i = 1; i < 4; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const formattedDate = date.toISOString().substring(0, 10);
        dates.push(formattedDate);
    }
    res.json({ dates: dates });
};
//#################################################################################################