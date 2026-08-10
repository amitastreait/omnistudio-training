global class DataMapperHelper implements System.Callable {
    
    global Object call(String action, Map<String, Object> args) {
        System.debug(System.LoggingLevel.DEBUG, System.JSON.serializePretty(args));
        List<Object> arguments = (List<Object>) args.get('arguments');
        if (action == 'upperCase') {
            return upperCase(arguments);
        }
        return null;
    }

    private Object upperCase(List<Object> arguments) {
        String value = String.valueOf(arguments.get(0));
        return value?.toUpperCase();
    }
}