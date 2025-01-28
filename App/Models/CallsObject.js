class CallsObject {
    constructor(
        caller_id = '',
        responder_id = '',
        call_location = '',
        call_notes = '',
        call_priority = '',
        call_status = '',
        call_timestamp = '',
        caller_data = ''
    ) {
        this.caller_id = caller_id
        this.responder_id = responder_id
        this.call_location = call_location
        this.call_notes = call_notes
        this.call_priority = call_priority
        this.call_status = call_status
        this.call_timestamp = call_timestamp
        this.caller_data = caller_data
    }
}

export default CallsObject