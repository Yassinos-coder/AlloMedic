import { StyleSheet } from 'react-native';

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    actionView: {
        zIndex: 10, // Bring it on top
        position: 'absolute', // Positioning required for zIndex to work
        bottom: 20, // Positioned at the bottom
        alignSelf: 'center', // Center horizontally
        backgroundColor: 'white', // Better contrast for shadow visibility
        borderRadius: 20,
        width: 300,
        height: 100,
        flexWrap: 'wrap', // Allow wrapping for nested views
        flexDirection: 'row', // Arrange views in rows
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Shadow for Android
    },
    nestedView: {
        flexBasis: '50%', // Take 50% of the container's width
        justifyContent: 'center',
        alignItems: 'center',
    },
    Pressables: {
        width: '100%',
        height: 50,
        justifyContent: 'center'
    },
    PressablesText: {
        color: 'white', // White text for visibility
       // fontWeight: 'bold',
        fontFamily:'poppins-semibold',
        textAlign: 'center',
        fontSize: 14,
    },
});

export default HomeStyles;
